document.addEventListener('DOMContentLoaded', (event) => {
  // when we open pop
  // send a message to inject.js to get the length and use that to loop
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'getOptionsCount', (res) => {
      console.log('res from get options count is: ' + res.optionsCount);
      for (let i = 0; i < res.optionsCount; i += 1) {
        console.log('should populate buttons on reopen');
        createBtn(i + 1);
      }
    });
  });

  const btnGetCSS = document.querySelector('#getCSS');
  const btnGetDefaultCSS = document.querySelector('#default-css');
  const cssOptionsContainer = document.querySelector('.css-options');

  function createBtn(btnID) {
    const btn = document.createElement('button');
    btn.setAttribute('id', `set-style-btn-${btnID}`);
    btn.textContent = `Style option ${btnID}`;
    btn.addEventListener('click', () => {
      console.log(`clicked ${btnID}`);
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, btnID);
      });
    });
    cssOptionsContainer.append(btn);
  }

  // // Get Default CSS Style
  // btnGetDefaultCSS.addEventListener('click', () => {
  //   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, 'getDefaultCSS');
  //   });
  // });

  // Get Customized CSS Style
  btnGetCSS.addEventListener('click', () => {
    // communicate with our inject.js
    console.log('get css btn clicked');
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'getCSS', (res) => {
        const id = res.count;
        createBtn(id);
      });
    });
  });
});
