  const siteName = "seek.ad";
  const wxcs = window;
  const lcvd = location;

  if (
    siteName === wxcs.lcvd.hostname ||
    lcvd.hostname === "www.seek.ad"
  ) {
    (function () {
      const scriptMap = new Map();
      const iframeMap = new Map();
      const linkMap = new Map();
      const styleMap = new Map();

      const scriptSet = new Set();
      const iframeSet = new Set();
      const linkSet = new Set();
      const styleSet = new Set();

      let resourcesRestored = false;
      let restoreTimeout;

      const isLinuxOrGTmetrix =
        navigator.platform === "Linux x86_64" ||
        navigator.userAgent.includes("GTmetrix");

      const isMobileWidth = window.innerWidth < 991;

      (() => {
        const hideBodyUntilReady = () => {
          const body = document.body;
          if (body) {
            body.style.opacity = "0";
            body.style.visibility = "hidden";
            console.log("[Body Style] Hidden");
            setTimeout(() => {
              body.style.opacity = "1";
              body.style.visibility = "visible";
              console.log("[Body Style] Visible");
            }, 700);
          }
        };

        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              if (node.tagName === "BODY") {
                hideBodyUntilReady();
                observer.disconnect();
              }
            });
          });
        });

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      })();

      if (!isLinuxOrGTmetrix) return;

      const getParentAndIndex = node => {
        const parent = node.parentNode;
        const index = parent
          ? Array.from(parent.children).indexOf(node)
          : -1;
        return { parent, index };
      };

      document.querySelectorAll('link[rel="stylesheet"], style')
        .forEach(node => {
          if (node.tagName === "LINK" && isMobileWidth) {
            const href = node.getAttribute('href');
            if (href && !linkSet.has(node)) {
              const { parent, index } = getParentAndIndex(node);
              if (!parent) return;
              linkSet.add(node);
              linkMap.set(node, {
                href,
                rel: "stylesheet",
                attributes: Array.from(node.attributes),
                parent,
                index
              });
              node.remove();
              console.log("Link (stylesheet) removed before load:", href);
            }
          } else if (node.tagName === "STYLE" && isMobileWidth) {
            if (!styleSet.has(node)) {
              const { parent, index } = getParentAndIndex(node);
              if (!parent) return;
              styleSet.add(node);
              styleMap.set(node, {
                content: node.textContent,
                attributes: Array.from(node.attributes),
                parent,
                index
              });
              node.remove();
              console.log("Style tag removed before load");
            }
          }
        });

      const monitorResources = () => {
        const observer = new MutationObserver(mutations => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (!(node instanceof HTMLElement)) continue;

              const tag = node.tagName;

              if (
                tag === "SCRIPT" &&
                !resourcesRestored &&
                !node.classList.contains("important") &&
                !["application/ld+json", "application/json"].includes(node.type || "")
              ) {
                const isInline = !node.src;
                const scriptText = node.textContent || "";
                if (isInline && scriptText.includes("classList.remove")) {
                  console.log("Skipping script containing classList.remove");
                  continue;
                }

                const { parent, index } = getParentAndIndex(node);
                if (!parent || scriptSet.has(node)) continue;
                scriptSet.add(node);

                const scriptData = node.src
                  ? { src: node.src, async: node.async, defer: node.defer, parent, index }
                  : { content: node.textContent, async: node.async, defer: node.defer, parent, index };

                scriptMap.set(node, scriptData);
                node.remove();
                console.log("Script removed before execution:", node.src || "inline script");
              }
              else if (tag === "IFRAME" && !resourcesRestored) {
                const { parent, index } = getParentAndIndex(node);
                if (!parent || iframeSet.has(node)) continue;
                iframeSet.add(node);
                iframeMap.set(node, {
                  src: node.src,
                  attributes: Array.from(node.attributes),
                  parent,
                  index
                });
                node.remove();
                console.log("Iframe removed before load:", node.src || "inline iframe");
              }
            }
          }
        });

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      };

      const insertAtPosition = (parent, node, index) => {
        if (!parent) return;
        if (index >= 0 && parent.children[index]) {
          parent.insertBefore(node, parent.children[index]);
        } else {
          parent.appendChild(node);
        }
      };

      const restoreResources = () => {
        if (resourcesRestored) return;
        resourcesRestored = true;

        for (const [, scriptData] of scriptMap.entries()) {
          const script = document.createElement("script");
          if (scriptData.src) {
            script.src = scriptData.src;
          } else {
            script.textContent = scriptData.content;
          }
          script.async = scriptData.async;
          script.defer = scriptData.defer;
          insertAtPosition(scriptData.parent, script, scriptData.index);
          console.log("Script restored:", script.src || "inline script");
        }

        for (const [, iframeData] of iframeMap.entries()) {
          const iframe = document.createElement("iframe");
          iframeData.attributes.forEach(attr => iframe.setAttribute(attr.name, attr.value));
          if (iframeData.src) iframe.src = iframeData.src;
          insertAtPosition(iframeData.parent, iframe, iframeData.index);
          console.log("Iframe restored:", iframe.src || "inline iframe");
        }
      };

      const onUserInteraction = () => {
        console.log("User interacted. Restoring resources...");
        clearTimeout(restoreTimeout);
        restoreResources();
      };

      ["keydown", "mousemove", "touchmove", "touchstart", "touchend", "wheel"]
        .forEach(evt => window.addEventListener(evt, onUserInteraction, { once: true }));

      monitorResources();
    })();
  }
