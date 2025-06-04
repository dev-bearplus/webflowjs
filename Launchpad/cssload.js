// Load css
// $.get('https://bitbucket.org/panicbearconsulting/webflowjs/raw/3ea4aa5c4f4a7093082c4155d3873b926fd395dc/Launchpad/launchpad.css', function(data) { 
//     $('head').append(`<style>${data}</style>`); 
// });

function loadXMLCss() {
    let loadCss = new XMLHttpRequest();
    loadCss.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let newStyle = document.createElement('style');
        newStyle.innerHTML = this.responseText
        document.querySelector("head").append(
            newStyle
        );
        console.log(this.responseText)
      }
    };
    loadCss.open("GET", "https://bitbucket.org/panicbearconsulting/webflowjs/raw/3ea4aa5c4f4a7093082c4155d3873b926fd395dc/Launchpad/launchpad.css", true);
    loadCss.send();
};
loadXMLCss()