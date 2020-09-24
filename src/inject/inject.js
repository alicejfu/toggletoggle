chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log('Hello. This message was sent from scripts/inject.js');
      // ----------------------------------------------------------
      // alert('alert from inject.js');
      const cssObj = [];

      const newStyle = document.createElement('style');
      newStyle.setAttribute('id', 'toggle-toggle');
      newStyle.setAttribute('type', 'text/css');

      document.querySelector('head').appendChild(newStyle);
      chrome.runtime.onMessage.addListener(function (req, sender, res) {
        // alert('test');
        // console.log(document.styleSheets);

        // document
        //   .querySelectorAll('.card')
        //   .forEach((element) => (element.style.backgroundColor = 'red'));
        if (req === 'getOptionsCount') {
          console.log('received request from get options count');
          res({ optionsCount: cssObj.length });
        }
        // else if (req === 'getDefaultCSS') {
        //   // select our toggleToggle and set text content to empty string
        //   document.querySelector('#toggle-toggle').textContent = '';
        // }
        else if (req === 'getCSS') {
          const allCSS = [...document.styleSheets]
            .map((styleSheet) => {
              try {
                return [...styleSheet.cssRules]
                  .map((rule) => rule.cssText)
                  .join('\n');
              } catch (e) {
                console.log(
                  'Access to stylesheet %s is denied. Ignoring...',
                  styleSheet.href
                );
              }
            })
            .filter(Boolean)
            .join('\n');

          cssObj.push(allCSS);
          // console.log('cssObj length is ' + cssObj.length);

          res({ count: cssObj.length });
        } else {
          console.log('button clicked is: ' + req);
          document.querySelector('#toggle-toggle').textContent =
            cssObj[req - 1];
        }
      });
    }
  }, 10);
});
