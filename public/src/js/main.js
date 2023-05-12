var data = new Date();
var socket;

function realname() {
  var username = prompt("Como deseja ser chamado?")

  const realname = `${username}#${Math.random()
    .toString(8)
    .substring(2, 6)}`;

  
  startSocket(realname);
}
realname();

function startSocket(nickname) {

  var messages = document.getElementById("messages");
  var form = document.getElementById("form");
  var input = document.getElementById("input");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit("message", {
        name: localStorage.getItem('username'),
        text: input.value
      });
      input.value = "";
    }
  });
  
  socket = io({
    query: {
      "username": nickname
    }
  })
  document.getElementById("username").innerHTML = nickname
  socket.emit('set-username', 'username');

  
  socket.on("new user", function (data) {
    var item = document.createElement("ul");
    item.textContent = data.name + data.msg;
    messages.appendChild(item);
    document
      .getElementById("chat")
      .scrollTo(document.getElementById("chat").scrollIntoView());
    });

  socket.on("user disconnect", (user) => {
    var item = document.createElement("ul");
    item.textContent = user.name + " has disconnected";
    messages.appendChild(item);
    document
      .getElementById("chat")
      .scrollTo(document.getElementById("chat").scrollIntoView());
  });
  
  socket.on('usersChange', (users) => {
    console.log(users);
  })

  socket.on("message", function (message) {
    const listItem = document.createElement("ul");
    listItem.innerHTML = `<div class="umessage">
                              <ul class="name">${message.name}</ul>
                              <ul class="text">${message.text}</ul>
                              <ul class="data">${message.data}</ul>
                          </div>`;
    messages.appendChild(listItem);
    document.getElementById("chat").scrollTo(0, messages.scrollHeight);
  });

}




// socket.on("disconnection", function (msg) {
//   var item = document.createElement("ul");
//   item.textContent = msg;
//   messages.appendChild(item);
//   document
//     .getElementById("chat")
//     .scrollTo(document.getElementById("chat").scrollIntoView());
// });

// Get the necessary elements
const chat = document.querySelector(".chat");
const formclass = document.querySelector(".form");
const messagesclass = document.querySelector(".messages");
const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".hide");
const toggleoffButton = document.getElementById("hide");

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", function () {
  toggleoffButton.classList.toggle("open");
  sidebar.classList.toggle("open");
  chat.classList.toggle("open");
  formclass.classList.toggle("open");
  messagesclass.classList.toggle("open");
});

// Add a click event listener to the toggle button
toggleoffButton.addEventListener("click", function () {
  toggleoffButton.classList.toggle("open");
  sidebar.classList.toggle("open");
  chat.classList.toggle("open");
  formclass.classList.toggle("open");
  messagesclass.classList.toggle("open");
});

const body = document.getElementById("body");
const darkmode = document.getElementById("dark-mode");
darkmode.addEventListener("click", function toggleDarkMode() {
  body.classList.toggle("dark-mode");
});
