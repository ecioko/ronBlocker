let blockedUsers = [];

chrome.storage.sync.get("blockedUsers", (data) => {
  if(data.blockedUsers) blockedUsers = data.blockedUsers;
  hideTweets();
});

function hideTweets() {
  const tweets = document.querySelectorAll("article");
  tweets.forEach(tweet => {
    const textElements = tweet.querySelectorAll("div[dir='auto'] span");
    let hide = false;
    textElements.forEach(el => {
      blockedUsers.forEach(user => {
        const regex = new RegExp(`\\b${user}\\b`, "i");
        if(regex.test(el.innerText)) hide = true;
      });
    });
    if(hide) tweet.style.display = "none";
  });
}

const observer = new MutationObserver(hideTweets);
observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.onChanged.addListener((changes) => {
  if(changes.blockedUsers) blockedUsers = changes.blockedUsers.newValue;

});
