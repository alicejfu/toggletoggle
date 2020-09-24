document.addEventListener('DOMContentLoaded', (event) => {
  let cssOptionsCount = 0;
  const btnGetCSS = document.querySelector('#getCSS');
  const cssOptionsContainer = document.querySelector('.css-options');

  for (let i = 0; i < cssOptionsCount; i += 1) {}

  btnGetCSS.addEventListener('click', () => {
    console.log('clicked get css btn');
    // communicate with our inject.js
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'getCSS', (res) => {
        const btn = document.createElement('button');
        const id = res.count;
        cssOptionsCount = id;
        btn.setAttribute('id', `set-style-btn-${id}`);
        btn.textContent = `Style option ${res.count}`;
        btn.addEventListener('click', () => {
          console.log(`clicked ${id}`);
          chrome.tabs.query({ currentWindow: true, active: true }, function (
            tabs
          ) {
            chrome.tabs.sendMessage(tabs[0].id, id);
          });
        });
        document.querySelector('.css-options').append(btn);
      });
    });
  });

  // const bg = chrome.extensions.getBackgroundPage();
});
