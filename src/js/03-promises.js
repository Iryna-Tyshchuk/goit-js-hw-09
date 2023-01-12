import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', createPromiseonBtnSubmit);

function createPromiseonBtnSubmit(event) {
  event.preventDefault();
  let count = 0;
  const datas = event.target.elements;

  const delay = Number(datas.delay.value);
  const step = Number(datas.step.value);
  const amount = Number(datas.amount.value);

  const promisesArr = [];
  for (let i = 0; i < amount; i += 1) {
    const promise = createPromise(1 + i, delay + i * step);
    promisesArr.push(promise);
    count += 1;
  }
  promisesArr.forEach(promise => promise.then(onSucsess).catch(onError));

  event.target.reset();
}

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

function onSucsess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
