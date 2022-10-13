//Select The Start Game Button
document.querySelector(".control-button span").onclick = function () {
  let yourName = prompt("What's Your Name?");
  //If Name Is Empty
  if (yourName == null || yourName == "") {
    document.querySelector(".info-container .name span").innerHTML = "Unknown";
  } else {
    //If Name Is Not Empty
    document.querySelector(".info-container .name span").innerHTML = yourName;
  }
  //Remove Splash Screen
  document.querySelector(".control-button").remove();
};
let duration = 1000;
let successRate = 0;
let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
//You Can Use This Too --- let orderRange = Array.from(Array(blocks.length).keys());
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

//Function
// Shuffling function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
// Flipping Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains("is-flipped"));
  if (allFlippedBlocks.length == 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Check Matched Blocks
function checkMatchedBlocks(firstBlock, SecondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === SecondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    SecondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("matched");
    SecondBlock.classList.add("matched");
    successRate++;
    if (successRate === orderRange.length / 2) {
      // blocks.classList.remove("matched");
      succeed();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

function succeed() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Bravo `);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}
