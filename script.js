const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let cardClicked = null

// prevent same card from being a match
let preventSameCard = false

function handleCardClick(event) {
  const target = event.currentTarget
  // console.log("you just clicked", target)
  if (preventSameCard ||
    target === cardClicked ||
    target.className.includes('flipped')) {
    return
  }
  // reveal card color on click
  target.className = target.className
  target.style.backgroundColor = target.className


  // when cards dont match flip back card
  function flipBack() {
    cardClicked.className = cardClicked.className.replace(' flipped', '')
    target.className = target.className.replace(' flipped', '')
    target.style.backgroundColor = null
    cardClicked.style.backgroundColor = null
  }
  // if clicked card, check is second card matches first card
  target.className += ' flipped'

  if (!cardClicked) {
    cardClicked = target
  }
  else if (cardClicked) {
    preventSameCard = true
    if (target.className !== cardClicked.className) {
      console.log('NO match')
      setTimeout(function () {
        // console.log('timer is working')
        flipBack()
        cardClicked = null
      }, 1000)
      preventSameCard = false
    }
    else {
      preventSameCard = false
      console.log('MATCH!')
      cardClicked = null
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
