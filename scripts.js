// *return will not stop it but just not show anymore so we need to put setInterval in it's variable
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
// need end for displayEndTime
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
  // Clear any existing timer
  clearInterval(countdown);
  const now = Date.now(); // the current time in miliseconds
  // now + the amount of sec u want it to be
  // now is in milisec and seconds in sec so you need to multiply by 1000;
  const then = now + seconds * 1000;
  // console.log({now,  then});
  // run immediatly once for *first display
  displayTimeLeft(seconds);

  // run every sec, we need to figure out how much time is left on the clock
  // setInterval need to wait a full sec to run
  countdown = setInterval(()=> {
    // const secondsLeft = (then - Date.now()) / 1000;
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if(secondsLeft < 0) {
      // *return
      clearInterval(countdown);
      return;
    }
    // then, display it(*second time)
    // console.log(secondsLeft);
    displayTimeLeft(secondsLeft);
    displayEndTime(then);

  }, 1000);
}

function displayTimeLeft(seconds) {
  // convert milisecs into seconds minutes etc
  const minutes = Math.floor(seconds / 60); 
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
  // console.log({minutes, remainingSeconds});

  // console.log({minutes, remainingSeconds});
}

// show ending time 2:00 > 5 min breack = back at 2:05
function displayEndTime(timestamp) {
  // turn that timestape in to a date, take the timestamp and create a new Date Object
  const end = new Date(timestamp);
  // get the hours
  const hours = end.getHours();
  // const adjustedHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  // then end, back to the top
  endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : '' }${minutes}`
  // if you're not european do
  // endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : '' }${minutes}`;
  // OR add it in a var then call it
  // endTime.textContent = `Be Back At ${adjustedHours}:${minutes < 10 ? '0' : '' }${minutes}`;
}

function startTimer() {
  // dataset gives an object then time gives a string
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
  console.log(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// Minutes Form
// if the dom element has an attribute name on it u can call it directly
// And if the child element has one too you can nest it
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  // have to convert into secs because timer is set in secs
  timer(mins * 60);
  // to reset the number in the textarea input
  this.reset();
});
