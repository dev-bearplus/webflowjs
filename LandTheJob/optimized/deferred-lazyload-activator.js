  if (
    window.location.hostname === "seek.ad" ||
    location.hostname === "www.seek.ad"
  ) {
    (function () {
      let hasInitialized = false;
      const match = {
        imgSelector: "img",
        scriptTag: "script",
        srcAttr: "data-src",
        realSrcAttr: "src",
        lazyScriptType: "text/lazyload",
        anchorTag: "a",
        hrefAttr: "data-href",
        realHrefAttr: "href",
        customEventInit: "asyncLazyLoad",
        customEventFinal: "asyncLoadComplete",
        event1: "DOMContentLoaded",
        event2: "scroll",
        event3: "mousemove",
        event4: "load"
      };

      function init() {
        if (hasInitialized) return;
        hasInitialized = true;

        // Load images
        document.querySelectorAll(match.imgSelector).forEach(img => {
          const dataSrc = img.getAttribute(match.srcAttr);
          if (dataSrc) {
            img.setAttribute(match.realSrcAttr, dataSrc);
          }
        });

        // Replace lazy scripts
        const scripts = document.getElementsByTagName(match.scriptTag);
        const scriptsToReplace = [];
        for (let i = 0; i < scripts.length; i++) {
          const script = scripts[i];
          if (script.getAttribute('type') === match.lazyScriptType) {
            scriptsToReplace.push(script);
          }
        }

        scriptsToReplace.forEach(oldScript => {
          const newScript = document.createElement(match.scriptTag);
          for (let j = 0; j < oldScript.attributes.length; j++) {
            const attr = oldScript.attributes[j];
            if (attr.name !== 'type') {
              newScript.setAttribute(attr.name, attr.value);
            }
          }
          newScript.innerHTML = oldScript.innerHTML;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Replace anchor hrefs
        const anchors = document.getElementsByTagName(match.anchorTag);
        for (let i = 0; i < anchors.length; i++) {
          const dataHref = anchors[i].getAttribute(match.hrefAttr);
          if (dataHref) {
            anchors[i].setAttribute(match.realHrefAttr, dataHref);
            anchors[i].removeAttribute(match.hrefAttr);
          }
        }

        // Dispatch custom init event
        document.dispatchEvent(new CustomEvent(match.customEventInit));

        // Dispatch final event after short delay
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent(match.customEventFinal));
        }, 100);
      }

      // Listen to user interactions
      [
        match.event1,
        match.event2,
        match.event3,
        match.event4
      ].forEach(eventName => {
        window.addEventListener(eventName, init, {
          once: true,
          passive: true
        });
      });
    })();
  }
