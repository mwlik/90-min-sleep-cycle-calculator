let date = new Date();

const HOUR_AND_HALF = 60000 * 90;
const HOUR = 60000 * 60;
const MINUTE = 60000;
const SECOND = 1000;
const HOUR_ROTATION = 30;
const MINUTE_ROTATION = 6;
const SECOND_ROTATION = 6;
const START_OF_NIGHT = 21;
const END_OF_NIGHT = 6;

let hourRotation = HOUR_ROTATION * date.getHours() + date.getMinutes() / 2;
let minuteRotation = MINUTE_ROTATION * date.getMinutes();
let secondRotation = MINUTE_ROTATION * date.getSeconds();

function rotate(element, rotation) {
  element.style.transform = `rotate(${rotation}deg)`;
}

function updateClock(hourRotation, minuteRotation, secondRotation) {
  rotate(hour, hourRotation);
  rotate(minute, minuteRotation);
  rotate(second, secondRotation);
}

function incrementSecond() {
  secondRotation += SECOND_ROTATION;
  updateClock(hourRotation, minuteRotation, secondRotation);
}

function incrementMinute() {
  minuteRotation += SECOND_ROTATION;
  updateClock(hourRotation, minuteRotation, secondRotation);
}

function incrementHour() {
  hourRotation += HOUR_ROTATION;
  updateClock(hourRotation, minuteRotation, secondRotation);
}

let restSecond = SECOND - date.getMilliseconds();
let restMinute =
  SECOND - date.getMilliseconds() + MINUTE - date.getSeconds() * SECOND;
let restHour =
  SECOND -
  date.getMilliseconds() +
  HOUR -
  date.getMinutes() * MINUTE -
  date.getSeconds() * SECOND;

setTimeout(() => {
  incrementSecond();
  setInterval(() => {
    incrementSecond();
  }, SECOND);
}, restSecond);

setTimeout(() => {
  incrementMinute();
  setInterval(() => {
    incrementMinute();
  }, MINUTE);
}, restMinute);

setTimeout(() => {
  incrementHour();
  setInterval(() => {
    incrementHour();
  }, HOUR);
}, restHour);

let themeDate = new Date();

function checkTheme(time) {
  if (time.getHours() < START_OF_NIGHT && time.getHours() > END_OF_NIGHT) {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
}

checkTheme(themeDate);

backward.addEventListener("click", () => {
  hourRotation -= 45;
  minuteRotation -= 540;
  themeDate = new Date(themeDate.getTime() - HOUR_AND_HALF);
  checkTheme(themeDate);
  updateClock(hourRotation, minuteRotation, secondRotation);
});

forward.addEventListener("click", () => {
  hourRotation += 45;
  minuteRotation += 540;
  themeDate = new Date(themeDate.getTime() + HOUR_AND_HALF);
  checkTheme(themeDate);
  updateClock(hourRotation, minuteRotation, secondRotation);
});

updateClock(hourRotation, minuteRotation, secondRotation);
