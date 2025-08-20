const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");
const blockedList = document.getElementById("blockedList");
const clearBtn = document.getElementById("clearBtn");

function updateUI(list) {
  blockedList.innerHTML = "";
  list.forEach(user => {
    const li = document.createElement("li");
    li.innerText = user;
    blockedList.appendChild(li);
  });
}

chrome.storage.sync.get("blockedUsers", (data) => {
  if(data.blockedUsers) updateUI(data.blockedUsers);
});

addBtn.addEventListener("click", () => {
  const name = userInput.value.trim();
  if(name === "") return;
  chrome.storage.sync.get("blockedUsers", (data) => {
    const list = data.blockedUsers || [];
    if(!list.includes(name)) list.push(name);
    chrome.storage.sync.set({ blockedUsers: list }, () => {
      updateUI(list);
      userInput.value = "";
    });
  });
});

clearBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ blockedUsers: [] }, () => {
    updateUI([]);
  });

});
