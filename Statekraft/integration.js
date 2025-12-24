const integration = () => {
    const CONFIG = window.STATEKRAFT_CONFIG;

  // ===========================================
  // STATE MANAGEMENT
  // ===========================================
  const AppState = {
    plan: null,
    cycle: 'monthly',
    sessionToken: null,
    user: null,
    tokens: null,
    widget: null,
    planDetails: null,
  };

  // ===========================================
  // STORAGE HELPERS
  // ===========================================
  function storeTokens(tokens) {
    sessionStorage.setItem('sk_okta_tokens', JSON.stringify(tokens));
  }

  function getStoredTokens() {
    try {
      return JSON.parse(sessionStorage.getItem('sk_okta_tokens'));
    } catch { return null; }
  }

  function storeUser(user) {
    sessionStorage.setItem('sk_user', JSON.stringify(user));
  }

  function getStoredUser() {
    try {
      return JSON.parse(sessionStorage.getItem('sk_user'));
    } catch { return null; }
  }

  function storeSessionToken(token) {
    sessionStorage.setItem('sk_session_token', token);
  }

  function getSessionToken() {
    return sessionStorage.getItem('sk_session_token');
  }

  function getAccessToken() {
    const tokens = getStoredTokens();
    if (!tokens) return null;
    return typeof tokens.accessToken === 'string'
      ? tokens.accessToken
      : tokens.accessToken?.accessToken;
  }

  function clearAllStorage() {
    sessionStorage.removeItem('sk_okta_tokens');
    sessionStorage.removeItem('sk_user');
    sessionStorage.removeItem('sk_session_token');
    // Clear Okta storage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('okta-') || key.includes('idx')) {
        sessionStorage.removeItem(key);
      }
    });
  }

  // ===========================================
  // API HELPERS
  // ===========================================
  async function apiRequest(endpoint, method = 'GET', data = null, useAuth = true) {
    const headers = { 'Content-Type': 'application/json' };

    if (useAuth) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      const error = new Error(result.message || 'Request failed');
      error.code = result.code || result.reason;
      error.status = response.status;
      throw error;
    }

    return result;
  }

  // ===========================================
  // INITIALIZATION
  // ===========================================
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));

  // Check for OAuth callback
  const interactionCode = urlParams.get('interaction_code');
  const authCode = urlParams.get('code');
  const error = urlParams.get('error');

  // Get plan from URL or session storage
  AppState.plan = urlParams.get('plan') || sessionStorage.getItem('sk_selected_plan') || 'nest';
  AppState.cycle = urlParams.get('cycle') || sessionStorage.getItem('sk_selected_cycle') || 'monthly';

  // Store plan before any redirect
  sessionStorage.setItem('sk_selected_plan', AppState.plan);
  sessionStorage.setItem('sk_selected_cycle', AppState.cycle);

  // Load existing state
  AppState.tokens = getStoredTokens();
  AppState.user = getStoredUser();
  AppState.sessionToken = getSessionToken();

  init();

  async function init() {
    console.log('🚀 Initializing subscription flow...');

    // Handle OAuth errors
    if (error) {
      const errorDesc = urlParams.get('error_description') || 'Authentication failed';
      showError(errorDesc);
      return;
    }

    // Handle OAuth callbacks
    if (interactionCode) {
      showStep('loading');
      updateLoadingMessage('Completing authentication...');
      await handleInteractionCode(interactionCode);
      return;
    }

    if (authCode) {
      showStep('loading');
      updateLoadingMessage('Completing authentication...');
      await handleAuthorizationCode(authCode);
      return;
    }

    // Check if already authenticated
    if (AppState.tokens && AppState.user) {
      console.log('✅ User already authenticated:', AppState.user.email);
      await initializeAuthenticatedSession();
      return;
    }

    // Show Okta widget
    showStep('auth');
    initOktaWidget();
  }

  // ===========================================
  // OKTA WIDGET
  // ===========================================
  function initOktaWidget() {
    console.log('🔐 Initializing Okta Sign-In Widget...');

    // Clear any existing Okta state
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('okta-') || key.includes('idx')) {
        sessionStorage.removeItem(key);
      }
    });

    const widgetContainer = document.getElementById('okta-signin-widget');
    if (!widgetContainer) {
      console.error('❌ Widget container not found!');
      return;
    }

    AppState.widget = new OktaSignIn({
      baseUrl: CONFIG.OKTA_DOMAIN,
      clientId: CONFIG.OKTA_CLIENT_ID,
      redirectUri: window.location.origin + window.location.pathname,
      authParams: {
        issuer: CONFIG.OKTA_ISSUER,
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
        responseType: 'code',
        state: generateState(),
      },
      useInteractionCodeFlow: true,
      features: {
        registration: true,
        rememberMe: true,
        showPasswordToggleOnSignInPage: true,
      },
      i18n: {
        en: {
          'primaryauth.title': 'Sign up for Statekraft',
          'primaryauth.submit': 'Continue',
        },
      },
    });

    // Check for existing session
    AppState.widget.authClient.tokenManager.get('idToken')
      .then(function(idToken) {
        if (idToken) {
          handleExistingSession(idToken);
        } else {
          renderWidget();
        }
      })
      .catch(renderWidget);
  }

  function renderWidget() {
    AppState.widget.showSignInToGetTokens({
      el: '#okta-signin-widget',
    }).then(handleOktaTokens)
      .catch(handleOktaError);
  }

  function generateState() {
    const state = 'state_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('okta_state', state);
    return state;
  }

  // ===========================================
  // TOKEN HANDLERS
  // ===========================================
  async function handleInteractionCode(interactionCode) {
    try {
      const codeVerifier = getCodeVerifier();
      if (!codeVerifier) {
        throw new Error('Session expired. Please try again.');
      }

      const params = new URLSearchParams({
        grant_type: 'interaction_code',
        interaction_code: interactionCode,
        client_id: CONFIG.OKTA_CLIENT_ID,
        redirect_uri: window.location.origin + window.location.pathname,
        code_verifier: codeVerifier,
      });

      const response = await fetch(`${CONFIG.OKTA_ISSUER}/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: params.toString(),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description || 'Token exchange failed');
      }

      await processTokens({
        accessToken: data.access_token,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
      });

      // Clean URL
      window.history.replaceState({}, '', `${window.location.pathname}?plan=${AppState.plan}&cycle=${AppState.cycle}`);

    } catch (error) {
      console.error('❌ Interaction code error:', error);
      showError(error.message);
    }
  }

  async function handleAuthorizationCode(code) {
    try {
      const codeVerifier = getCodeVerifier();

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: CONFIG.OKTA_CLIENT_ID,
        redirect_uri: window.location.origin + window.location.pathname,
      });

      if (codeVerifier) {
        params.append('code_verifier', codeVerifier);
      }

      const response = await fetch(`${CONFIG.OKTA_ISSUER}/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: params.toString(),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description || 'Token exchange failed');
      }

      await processTokens({
        accessToken: data.access_token,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
      });

      window.history.replaceState({}, '', `${window.location.pathname}?plan=${AppState.plan}&cycle=${AppState.cycle}`);

    } catch (error) {
      console.error('❌ Authorization code error:', error);
      showError(error.message);
    }
  }

  function getCodeVerifier() {
    const storageKeys = [
      'okta-transaction-storage',
      'okta-pkce-storage',
      'okta-cache-storage',
      'okta-shared-transaction-storage',
    ];

    for (const key of storageKeys) {
      const stored = sessionStorage.getItem(key) || localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const verifier = parsed?.codeVerifier || parsed?.transaction?.codeVerifier;
          if (verifier) return verifier;
        } catch (e) {}
      }
    }

    return sessionStorage.getItem('okta_code_verifier');
  }

  async function processTokens(tokens) {
    // Parse ID token
    const claims = parseJwt(tokens.idToken);

    AppState.user = {
      oktaId: claims.sub,
      email: claims.email,
      username: claims.custom_username || claims.nickname || claims.preferred_username || claims.email?.split('@')[0],
      firstName: claims.given_name || '',
      lastName: claims.family_name || '',
    };

    AppState.tokens = tokens;
    storeTokens(tokens);
    storeUser(AppState.user);

    console.log('✅ User authenticated:', AppState.user.email);

    await initializeAuthenticatedSession();
  }

  async function handleOktaTokens(tokens) {
    console.log('✅ Okta tokens received from widget');

    const idToken = tokens.tokens?.idToken || tokens.idToken;
    const claims = idToken.claims || parseJwt(idToken.idToken || idToken);

    AppState.user = {
      oktaId: claims.sub,
      email: claims.email,
      username: claims.custom_username || claims.nickname || claims.preferred_username || claims.email?.split('@')[0],
      firstName: claims.given_name || '',
      lastName: claims.family_name || '',
    };

    AppState.tokens = {
      accessToken: tokens.tokens?.accessToken?.accessToken || tokens.accessToken?.accessToken,
      idToken: idToken.idToken || idToken,
    };

    storeTokens(AppState.tokens);
    storeUser(AppState.user);

    await initializeAuthenticatedSession();
  }

  function handleExistingSession(idToken) {
    const claims = idToken.claims || parseJwt(idToken.idToken);
    AppState.user = {
      oktaId: claims.sub,
      email: claims.email,
      firstName: claims.given_name || '',
      lastName: claims.family_name || '',
    };
    storeUser(AppState.user);
    initializeAuthenticatedSession();
  }

  function handleOktaError(error) {
    console.error('❌ Okta error:', error);
    const errorMsg = error.message || '';

    if (errorMsg.includes('already exists') || errorMsg.includes('already registered')) {
      showError('This email is already registered. Please sign in instead.');
    } else if (error.name !== 'AuthApiError' || !errorMsg.includes('cancelled')) {
      showError(errorMsg || 'Authentication failed. Please try again.');
    }
  }

  // ===========================================
  // AUTHENTICATED SESSION (PRODUCTION FLOW)
  // ===========================================
  async function initializeAuthenticatedSession() {
    showStep('loading');
    updateLoadingMessage('Setting up your subscription...');

    try {
      const accessToken = getAccessToken();

      if (accessToken) {
        // PRODUCTION: Use authenticated endpoint
        console.log('🔐 Using authenticated subscription flow...');
        const result = await apiRequest(
          CONFIG.ENDPOINTS.initiateAuthenticated,
          'POST',
          {
            accountType: 'individual',
            tier: AppState.plan,
            billingCycle: AppState.cycle,
          }
        );

        if (result.sessionToken) {
          AppState.sessionToken = result.sessionToken;
          storeSessionToken(result.sessionToken);
          console.log('✅ Authenticated session created:', result.sessionToken);
        }

        // Store plan details if returned
        if (result.plan) {
          AppState.planDetails = result.plan;
        }
      } else {
        // Fallback: Token expired, re-authenticate
        console.log('⚠️ No access token, re-authenticating...');
        clearAllStorage();
        showStep('auth');
        initOktaWidget();
        return;
      }

      // Show personal details form
      showStep('personal-details');
      prefillForm();
      updateSummary();

    } catch (error) {
      console.error('❌ Session initialization error:', error);

      // Handle token expiry
      if (error.message?.includes('expired') || error.message?.includes('Invalid') || error.status === 401) {
        console.log('🔄 Token expired, clearing state...');
        clearAllStorage();
        showStep('auth');
        initOktaWidget();
        return;
      }

      showError(error.message || 'Failed to initialize subscription');
    }
  }

  // ===========================================
  // FORM HANDLING
  // ===========================================
  function prefillForm() {
    if (!AppState.user) return;

    const fullNameField = document.querySelector('[data-sk-field="fullName"]');
    if (fullNameField) {
      fullNameField.value = `${AppState.user.firstName} ${AppState.user.lastName}`.trim();
    }
  }

  function updateSummary() {
    // Fetch plan details from backend if not cached
    if (!AppState.planDetails) {
      apiRequest(`${CONFIG.ENDPOINTS.getPlans}/${AppState.plan}`, 'GET', null, false)
        .then(plan => {
          AppState.planDetails = plan;
          displaySummary();
        })
        .catch(() => displaySummary()); // Use fallback prices
    } else {
      displaySummary();
    }
  }

  function displaySummary() {
    const planDisplay = document.querySelector('[data-sk-display="plan"]');
    const priceDisplay = document.querySelector('[data-sk-display="price"]');
    const cycleDisplay = document.querySelector('[data-sk-display="cycle"]');

    // Fallback prices if API not available
    const fallbackPrices = {
      nest: { monthly: 0, annual: 0 },
      perch: { monthly: 14.99, annual: 149.90 },
      council: { monthly: 39.99, annual: 399.90 },
      parliament: { monthly: 99.99, annual: 999.90 },
    };

    const planName = AppState.planDetails?.name || AppState.plan.charAt(0).toUpperCase() + AppState.plan.slice(1);
    const price = AppState.planDetails
      ? (AppState.cycle === 'annual' ? AppState.planDetails.annualPrice : AppState.planDetails.monthlyPrice)
      : (fallbackPrices[AppState.plan]?.[AppState.cycle] || 0);

    if (planDisplay) planDisplay.textContent = planName;
    if (priceDisplay) priceDisplay.textContent = '$' + price.toFixed(2);
    if (cycleDisplay) cycleDisplay.textContent = AppState.cycle === 'annual' ? 'per year' : 'per month';
  }

  // Personal details form submission
  const personalForm = document.querySelector('[data-sk-form="personal-details"]');
  if (personalForm) {
    personalForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      showStep('loading');
      updateLoadingMessage('Saving your details...');

      const formData = {
        fullName: document.querySelector('[data-sk-field="fullName"]')?.value?.trim(),
        address: document.querySelector('[data-sk-field="address"]')?.value?.trim(),
        phoneNumber: document.querySelector('[data-sk-field="phoneNumber"]')?.value?.trim(),
        abn: document.querySelector('[data-sk-field="abn"]')?.value?.trim(),
      };

      const paymentData = {
        invoiceAddress: document.querySelector('[data-sk-field="invoiceAddress"]')?.value?.trim() || formData.address,
        discountCode: document.querySelector('[data-sk-field="discountCode"]')?.value?.trim(),
      };

      if (!formData.fullName || !formData.address) {
        showError('Please fill in all required fields');
        showStep('personal-details');
        return;
      }

      try {
        // Save personal details
        await apiRequest(CONFIG.ENDPOINTS.personalDetails, 'POST', {
          sessionToken: AppState.sessionToken,
          ...formData,
        });

        // Save payment/billing details
        await apiRequest(CONFIG.ENDPOINTS.paymentDetails, 'POST', {
          sessionToken: AppState.sessionToken,
          paymentFullName: formData.fullName,
          paymentEmail: AppState.user?.email || '',
          ...paymentData,
        });

        console.log('✅ Details saved');

        // Create payment intent and redirect to Airwallex
        updateLoadingMessage('Preparing payment...');

        const paymentIntent = await apiRequest(CONFIG.ENDPOINTS.createIntent, 'POST', {
          sessionToken: AppState.sessionToken,
        });

        console.log('✅ Payment intent created:', paymentIntent.paymentIntentId);

        // Store for callback
        sessionStorage.setItem('awx_session_token', AppState.sessionToken);
        sessionStorage.setItem('awx_payment_intent_id', paymentIntent.paymentIntentId);

        // Redirect to Airwallex Hosted Payment Page
        if (paymentIntent.url) {
          console.log('🔀 Redirecting to Airwallex Hosted Payment Page...');
          window.location.href = paymentIntent.url;
        } else {
          throw new Error('No payment URL received');
        }

      } catch (error) {
        console.error('❌ Form submission error:', error);
        showError(error.message || 'Failed to process. Please try again.');
        showStep('personal-details');
      }
    });
  }

  // ===========================================
  // UI HELPERS
  // ===========================================
  function showStep(stepName) {
    document.querySelectorAll('[data-sk-step]').forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    const step = document.querySelector(`[data-sk-step="${stepName}"]`);
    if (step) {
      step.classList.add('active');
      step.style.display = 'block';
    }
  }

  function updateLoadingMessage(message) {
    const textEl = document.querySelector('[data-sk-loading-text]');
    if (textEl) textEl.textContent = message;
  }

  function showError(message) {
    const errorContainer = document.querySelector('[data-sk-error]');
    if (errorContainer) {
      errorContainer.style.display = 'block';
      const msgEl = errorContainer.querySelector('[data-sk-error-message]');
      if (msgEl) msgEl.textContent = message;
    }
    showStep('error');
  }

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return {};
    }
  }
}
