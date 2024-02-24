import backgroundRandomImage from "./modules/api.js";
import { getAllSavesItem, manageId } from "./modules/storage.js";

// $ refrence to the document word
let $ = document;
const buttonStartGame = $.getElementById("start");
const inputEnterName = $.getElementById("text");

// // background Image
document.addEventListener("DOMContentLoaded", () => {
  backgroundRandomImage()
    .then((imgUrl) => {
      if (imgUrl) {
        document.body.style.backgroundImage = `url('${imgUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } else {
        document.body.style.backgroundImage = `url("./assests/img/back.jpg")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      }
    })
    .catch((err) => {
      console.log(err.name);
    });
});

// onclick button and go to next page
buttonStartGame.addEventListener("click", startGame);
// on enter press and go to next page
inputEnterName.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    startGame();
  }
});

// this part for get data from localstorage, make div for each player(include:name,avatar,score)
let players = getAllSavesItem(localStorage.getItem("id"));

const container = $.getElementById("container");
container.innerHTML = "";
let number = 0;
for (let i = 0; i < players.length; i++) {
  const passedName = players[i].name;
  const localName = localStorage.getItem(passedName);
  const card = JSON.parse(localName);
  let score = card ? card.score : 0;
  number++;
  container.innerHTML += `<div class="add-score" id="container">
  <span class="icon"><i class="bi bi-${number}-circle"></i></span>
  <div class="avatar-name">
      <img src="https://source.boringavatars.com/beam/120/${players[i].name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51" width="20px" onerror="this.style.display='none'">
      <span class = "name">${players[i].name}</span>
</div>
<span class= "scores">${score}</span>
</div>`;
}

// this function for both click on button and press enter when wants to go on game.html page
function startGame() {
  let inputValue = inputEnterName.value;
  inputEnterName.value = "";
  if (inputValue.length >= 3) {
    const isExist = players.find((p) => p.name === inputValue);

    if (!isExist) {
      manageId(inputValue);
    }
    goToAnotherPage(inputValue);
  } else {
    alert("Your NickName Should Be More Than 3");
  }
}
// Go to the next page and show the name of the player in the url of game.html page
function goToAnotherPage(name) {
  const destinationPage = "game.html?name=" + encodeURIComponent(name);
  window.location.href = destinationPage;
}
