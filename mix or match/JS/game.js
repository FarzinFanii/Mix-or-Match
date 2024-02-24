import backgroundRandomImage from "./modules/api.js";

// this listener for add background image when html file is loaded.
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
    .catch((error) => {
      console.log("USE VPN");
    });
});

// save document as $
let $ = document;
const timer = $.getElementById("timer");
const gameOverText = $.getElementById("game-over");
const startGame = $.querySelector(".over-page");
const gameOver = $.getElementById("game-over");
const winner = $.getElementById("winer");
const btnHome = $.getElementById("btn-home");
const leaderboardBtn = $.querySelectorAll(".flex-button");
const counterFlip = $.getElementById("flip");
let counterValue;
let score = 0;
let timeValue = 0;
let clickedDivs = [];
let array = [];
// object that contains all img's source, name of each img, id & time and rorate
const myObj = [
  {
    id: 1,
    name: "icon1",
    rotate: false,
    image: "./assests/img/knife.png",
  },
  {
    id: 2,
    name: "icon1",
    rotate: false,
    image: "./assests/img/knife.png",
  },
  {
    id: 3,
    name: "icon2",
    rotate: false,
    image: "./assests/img/bomb.png",
  },
  {
    id: 4,
    name: "icon2",
    rotate: false,
    image: "./assests/img/bomb.png",
  },
  {
    id: 5,
    name: "icon3",
    rotate: false,
    image: "./assests/img/ninja.png",
  },
  {
    id: 6,
    name: "icon3",
    rotate: false,
    image: "./assests/img/ninja.png",
  },
  {
    id: 7,
    name: "icon4",
    rotate: false,
    image: "./assests/img/rose.png",
  },
  {
    id: 8,
    name: "icon4",
    rotate: false,
    image: "./assests/img/rose.png",
  },
  {
    id: 9,
    name: "icon5",
    rotate: false,
    image: "./assests/img/car.png",
  },
  {
    id: 10,
    name: "icon5",
    rotate: false,
    image: "./assests/img/car.png",
  },
  {
    id: 11,
    name: "icon6",
    rotate: false,
    image: "./assests/img/icon-6.png",
  },
  {
    id: 12,
    name: "icon6",
    rotate: false,
    image: "./assests/img/icon-6.png",
  },
  {
    id: 13,
    name: "icon7",
    rotate: false,
    image: "./assests/img/teenager.png",
  },
  {
    id: 14,
    name: "icon7",
    rotate: false,
    image: "./assests/img/teenager.png",
  },
  {
    id: 15,
    name: "icon8",
    rotate: false,
    image: "./assests/img/michaelangelo.png",
  },
  {
    id: 16,
    name: "icon8",
    rotate: false,
    image: "./assests/img/michaelangelo.png",
  },
];

// get name from url
let urlParams = new URLSearchParams(window.location.search);
let passedName = urlParams.get("name");
const allCards = $.getElementById("all-cards");

// save time,score, flip, position of cards by player name. then check if all cards are rotate or not.
let items;
const isObjectAvailable = localStorage.getItem(passedName);
if (!isObjectAvailable) {
  items = randomArray(myObj);
  score = 0;
  counterValue = 0;
  timeValue = 60;
} else {
  const localObj = localStorage.getItem(passedName);
  const card = JSON.parse(localObj);
  items = JSON.parse(card.cards);
  if (checkAllRotate()) {
    counterValue = 0;
    timeValue = 60;
    items = randomArray(myObj);
    counterFlip.innerText = counterValue;
    score = card.score;
  } else {
    score = card.score;
    counterValue = card.flip;
    counterFlip.innerText = counterValue;
    timeValue = card.time;
  }
}

// this button for go to index.html page
btnHome.addEventListener("click", goHomePage);

// button for back to home
for (let i = 0; i < leaderboardBtn.length; i++) {
  leaderboardBtn[i].addEventListener("click", goHomePage);
}

// when click for startgame. use clicktostartgame function
startGame.addEventListener("click", clickToStartGame);
// when click for startgame again. use clicktorestartgame function
gameOver.addEventListener("click", clickToReStartGame);

// this function for go to home page
function goHomePage() {
  window.location.href = "./index.html";
}

// This Function For Click & Hide A (Click To Start game) Text's and then start game.
let timeIntervalId = 0;

function clickToStartGame() {
  startGame.classList.remove("visible");
  timeIntervalId = changeTime();
}

// This Function For Click & Hide A (Click To restart game) Text's and then start game.
function clickToReStartGame() {
  gameOver.classList.remove("visible");
  localStorage.removeItem(passedName);
  clearInterval(timeIntervalId);
  items = randomArray(myObj);
  score = 0;
  counterValue = 0;
  timeValue = 60;
  allCards.innerHTML = "";
  createCard();
  timeIntervalId = changeTime();
}

// // This Function For Decrease Time Value In Html File After One Second. if time=0 , add style and clear time.
function changeTime() {
  timer.innerHTML = timeValue;
  let timerInterval = setInterval(function () {
    saveLocalStorage(score, timeValue, counterValue, JSON.stringify(items));
    timeValue--;
    document.getElementById("timer").innerText = timeValue;
    if (timeValue === 0) {
      clearInterval(timerInterval);
      localStorage.removeItem("time");
      gameOverText.classList.add("over-page");
      gameOverText.classList.add("visible");
    }
  }, 1000);
  return timerInterval;
}

// clear timer function
function stopInterval(timerInterval) {
  clearInterval(timerInterval);
}

//  get randomImage from myobj and put all datas to newarray
function randomArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// this function for create each cards
function createCard() {
  for (let i = 0; i < items.length; i++) {
    let randomImagee = items[i].image;
    const newDiv = document.createElement("div");
    if (items[i].rotate) {
      newDiv.classList.add("matched");
      newDiv.classList.add("visible");
    }
    newDiv.classList.add("card");
    newDiv.innerHTML += `
      <div class="card-back card-face">
      <img class="corner corner-top-left" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="corner corner-top-right" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="corner corner-bottom-left" src="./assests/img/border-design2.png" alt="corner img">
      <img class="corner corner-bottom-right" src="./assests/img/border-design2.png" alt="corner img">
      <img class="ghost" src="./assests/img/ghost.png" alt="ghost img">
      </div>
      <div class="card-front card-face">
      <img class="corner corner-top-left" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="corner corner-top-right" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="corner corner-bottom-left" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="corner corner-bottom-right" src="./assests/img/border-design2.png" alt="Corner img">
      <img class="card-value" src=${randomImagee} alt="ghost img">
      </div>`;
    allCards.appendChild(newDiv);
    newDiv.addEventListener("click", () => clickEachCard(newDiv, i));
  }
}
// call this function
createCard();

// this function for when clicked on each cards.includes check rotate, calculate scores, update flip , add animation when cards are matched
function clickEachCard(div, index) {
  if (clickedDivs.length >= 2) {
    return;
  }
  if (!items[index].rotate) {
    items[index].rotate = true;
    counterValue++;
    flipContent();
    clickedDivs.push({ index, div });
    div.classList.add("visible");
    if (clickedDivs.length === 2) {
      if (
        items[clickedDivs[0].index].name === items[clickedDivs[1].index].name
      ) {
        clickedDivs[0].div.classList.add("matched");
        clickedDivs[1].div.classList.add("matched");
        calculateScore();
        array.push(clickedDivs[0].index);
        array.push(clickedDivs[1].index);
        clickedDivs = [];
        const check = checkAllRotate();
        if (check) {
          console.log("hello");
          winner.classList.add("visible");
          stopInterval(timeIntervalId);
          saveLocalStorage(
            score,
            timeValue,
            counterValue,
            JSON.stringify(items)
          );
        } else {
          winner.classList.remove("visible");
        }
      } else {
        setTimeout(() => {
          items[clickedDivs[0].index].rotate = false;
          items[clickedDivs[1].index].rotate = false;
          clickedDivs[0].div.classList.remove("visible");
          clickedDivs[1].div.classList.remove("visible");
          clickedDivs = [];
        }, 1000);
      }
    }
  }
}

// update flip content after clicked on cards
function flipContent() {
  counterFlip.textContent = counterValue;
}

// this function for check if all cards are rotate or not!
function checkAllRotate() {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].rotate) {
      return false;
    }
  }
  return true;
}

// this function for save as object on localstorage
function saveLocalStorage(score, time, flip, array) {
  let eachPlayer = {
    time: time,
    flip: flip,
    score: score,
    cards: array,
  };
  let playerJSON = JSON.stringify(eachPlayer);
  localStorage.setItem(passedName, playerJSON);
}

// add +5 to scores when both cards are matched
function calculateScore() {
  score = score + 5;
}
