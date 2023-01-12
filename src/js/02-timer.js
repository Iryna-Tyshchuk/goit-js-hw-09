import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
// const selectedDay = onClose();

flatpickr('input#datetime-picker', options);
const timer = {
  deadline: new Date(2023, 0, 9, 22, 58),
  intervalId: null,
  rootSelector: document.querySelector('.timer'),

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();

      if (diff <= 0) {
        Notiflix.Notify.failure('Please choose a date in the future');

        return;
      }

      const { days, hours, minutes, seconds } = this.getTimeComponents(diff);

      this.rootSelector.querySelector('span[data-days]').textContent =
        this.pad(days);
      this.rootSelector.querySelector('span[data-hours]').textContent =
        this.pad(hours);
      this.rootSelector.querySelector('span[data-minutes]').textContent =
        this.pad(minutes);
      this.rootSelector.querySelector('span[data-seconds]').textContent =
        this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },
};

timer.start();

// declensionNum(num, words) {
//   return words[
//     num % 100 > 4 && num % 100 < 20
//       ? 2
//       : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
//   ];
// }

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
