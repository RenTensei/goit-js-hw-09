import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

Report.init({
  backOverlayClickToClose: true,
});

let intervalId = null;
let selectedTime = null;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const timeRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    selectedTime = selectedDates[0];
  },
};

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

function addLeadingZero(value) {
  if (intervalId) {
  }
  return String(value).padStart(2, 0);
}

function startHandler() {
  if (intervalId) {
    return;
  }
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    if (selectedTime.getTime() <= new Date().getTime()) {
      Report.success(
        "It's time!",
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      clearInterval(intervalId);
      intervalId = null;
      return;
    }

    let convertedTime = convertMs(
      selectedTime.getTime() - new Date().getTime()
    );

    timeRefs.days.textContent = addLeadingZero(convertedTime.days);
    timeRefs.hours.textContent = addLeadingZero(convertedTime.hours);
    timeRefs.minutes.textContent = addLeadingZero(convertedTime.minutes);
    timeRefs.seconds.textContent = addLeadingZero(convertedTime.seconds);
  }, 1000);
}

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startHandler);
