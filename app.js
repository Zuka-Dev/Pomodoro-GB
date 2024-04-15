//Required functionalities
/*
  1. Regular Timer
  2. Break Timer
  3. Play sound after time ends
  3. Customise Time
  4. Skip time
  5. Change color of Panel and other things(aesthetics)
  6. Pause the timer (Not implemented)
 */
// Define variables
let timer;
let minutes = 25;
let seconds = 0;
let breakMins = 5;
let breakSecs = 0;
let isPaused = false; // Not it will be used yet
let isFocus = true;
let customTime;
const audioData = new Audio("ding.mp3");
const timerElement = document.querySelectorAll(".timer-number");

// Start timer for focus period
function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

// Update the display on the screen
function updateTimer() {
  if (isFocus) {
    timerElement[0].style.color = "white";
    timerElement[1].style.color = "white";
    document.getElementById("panel").textContent = "Focus";
    document.getElementById("panel").style.color = "white";
  }
  timerElement[0].textContent = getMinutes(minutes);
  timerElement[1].textContent = getSeconds(seconds);

  if (minutes === 0 && seconds === 0) {
    // Stop since it has ended
    clearInterval(timer);
    // Make sound
    audioData.play();
    if (isFocus) {
      startBreak();
    } else {
      resetTimer();
    }
  } else if (!isPaused) {
    // CHanging later if
    if (seconds > 0) {
      // if seconds are still counting by subtracting one
      seconds--;
    } else {
      // If seconds have reached zero
      // subtract one from minutes
      seconds = 59;
      minutes--;
    }
  }
}

// Minutes
function getSeconds(sec) {
  return `${String(sec).padStart(2, "0")}`;
}
// Seconds
function getMinutes(min) {
  return `${String(min).padStart(2, "0")}`;
}

// Reset time
function resetTimer() {
  clearInterval(timer);
  minutes = customTime || 25;
  seconds = 0;
  isFocus = true;
  timerElement[0].textContent = getMinutes(minutes);
  timerElement[1].textContent = getSeconds(seconds);
  startTimer();
}

// Start a custom timer
function startCustomTimer(time) {
  customTime = time;
  resetTimer();
}

// Start break timer
function startBreak() {
  document.getElementById("panel").textContent = "Break";
  document.getElementById("panel").style.color = "lightcoral";

  isFocus = false;
  clearInterval(timer);
  minutes = breakMins || 5;
  seconds = 0;
  timerElement[0].style.color = "lightcoral";
  timerElement[1].style.color = "lightcoral";
  timerElement[0].textContent = getMinutes(minutes);
  timerElement[1].textContent = getSeconds(seconds);
  timer = setInterval(updateTimer, 1000);
}

// Skip break
function skipBreak() {
  if (isFocus == false) {
    document.getElementById("skip").classList.remove("disabled");
    clearInterval(timer);
    isFocus = true;

    resetTimer();
  } else {
    return;
  }
}
function toggleDialogue() {
  document.getElementById("back").classList.remove("hide");
}
function closeDialogue() {
  document.getElementById("back").classList.add("hide");
}

// HTML form  for the custom timer
document.getElementById("dialogue").addEventListener("submit", selectTime);
function selectTime(e) {
  e.preventDefault();
  const customTimeInput = parseInt(document.getElementById("custom").value);
  if (customTimeInput > 0 && !isNaN(customTimeInput)) {
    startCustomTimer(customTimeInput);
    closeDialogue();
  } else {
    alert("Invalid input. Please enter a valid number greater than 0.");
  }
}

// Start the initial timer
startTimer();
