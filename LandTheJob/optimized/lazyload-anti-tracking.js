  let siteName = "seek.ad";
  const wxcs = window;
  const lcvd = location;

  if (
    siteName === wxcs.lcvd.hostname ||
    lcvd.hostname === "www.seek.ad"
  ) {
    (function () {
      if (navigator.platform === "Linux x86_64") {
        const observer = new MutationObserver(mutations => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (
                node.nodeType !== 1 ||
                node.tagName !== "SCRIPT"
              ) continue;

              const isExternal = node.hasAttribute("src");
              const src = node.getAttribute("src") || "";

              if (isExternal && node.innerHTML) {
                const code = node.innerHTML;

                if (code.includes("csyncLoad")) {
                  node.innerHTML = code
                    .replace(
                      "if(window.attachEvent)",
                      "document.addEventListener('asyncLazyLoad', function(event) { asyncLoad(); }); if(window.attachEvent)"
                    )
                    .replace(/, *csyncLoad/g, ", function(){}");
                }

                if (code.includes("PreviewBarConnector")) {
                  node.innerHTML = code.replace(
                    /DOMContentLoaded/g,
                    "csyncLazyLoad"
                  );
                }
              }

              if (node.className === "analytics") {
                node.type = "text/lazyload";
              }

              const lazySources = [
                "assets/storefront/features",
                "assets/shopify_pay",
                "connect.facebook.net",
                "google-analytics.com",
                "googletagmanager.com",
                "snap.licdn.com",
                "analytics.tiktok.com",
                "cdn.rgamaze.io",
                "cdn.qeement.com"
              ];

              if (
                isExternal &&
                lazySources.some(keyword => src.includes(keyword))
              ) {
                node.setAttribute("data-src", src);
                node.removeAttribute("src");
              }
            }
          }
        });

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });

        window.triggerAsyncLazyLoad = function () {
          const lazyScripts = document.querySelectorAll(
            'script[type="text/lazyload"], script[data-src]'
          );

          lazyScripts.forEach(script => {
            const newScript = document.createElement("script");

            if (script.dataset.src) {
              newScript.src = script.dataset.src;
            } else {
              newScript.innerHTML = script.innerHTML;
            }

            script.parentNode.replaceChild(newScript, script);
          });

          document.dispatchEvent(new CustomEvent("asyncLazyLoad"));
        };
      }
    })();
  }
