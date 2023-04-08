import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(e) {
  e.preventDefault();

  // get data from form
  const FD = new FormData(formRef);
  const delay = parseInt(FD.get('delay'));
  const step = parseInt(FD.get('step'));
  const amount = parseInt(FD.get('amount'));

  for (let i = 0; i < amount; i++) {
    const currentPosition = i + 1;
    const totalDelay = i * step + delay;

    createPromise(currentPosition, totalDelay)
      .then(({ position, delay }) => {
        Notify.success('it worked!');
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure('something went wrong :(');
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

formRef.addEventListener('submit', handleSubmit);
