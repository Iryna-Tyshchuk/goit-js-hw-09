import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const rootSelector = document.querySelector('.timer');
const buttonStart = document.querySelector('button');
const daysEl = rootSelector.querySelector('span[data-days]');
const hoursEl = rootSelector.querySelector('span[data-hours]');
const minutesEl = rootSelector.querySelector('span[data-minutes]');
const secondsEl = rootSelector.querySelector('span[data-seconds]');
console.log(daysEl);
buttonStart.disabled = true;

let selectedData = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const diff = selectedDates[0] - Date.now();
    if (diff < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }
    buttonStart.disabled = false;
    selectedData = selectedDates[0];
  },
};
flatpickr('input#datetime-picker', options);

buttonStart.addEventListener('click', onStartBtnClick);
function onStartBtnClick() {
  buttonStart.disabled = true;
  intervalId = setInterval(() => {
    const diff = selectedData - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
