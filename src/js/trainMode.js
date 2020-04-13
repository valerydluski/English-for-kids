import {saveState, restoreState, pageStatus, appStats} from './main';

// reverse card
const hideTranslate = (child) => {
  child[1].classList.add('text-hidden');
  child[0].classList.remove('text-hidden');
  child[2].classList.remove('button_hidden');
};

const reverseCardBeginState = () => {
  const card = event.currentTarget;
  card.classList.add('run-animation');
  function deleteAnimation() {
    card.classList.remove('run-animation');
  }
  setTimeout(deleteAnimation, 1000);
  hideTranslate(card.childNodes[1].childNodes);
  card.removeEventListener('mouseleave', reverseCardBeginState);
};


const changeText = (child) => {
  child[0].classList.add('text-hidden');
  child[1].classList.remove('text-hidden');
};

const reverseCard = (card) => {
  card.classList.add('run-animation');
  changeText(card.childNodes[1].childNodes);
  function createMouseleave() {
    card.classList.remove('run-animation');
    card.addEventListener('mouseleave', reverseCardBeginState);
  }
 setTimeout(createMouseleave, 1000);
};
  // play audio for train
const playAudioForTrain = (str) => {
  const audioTrain = new Audio();
  audioTrain.src = `https://wooordhunt.ru//data/sound/word/us/mp3/${str}.mp3`;
  audioTrain.autoplay = true;
};

const trainCounter = (id) => {
  const numberCard = id.slice(4);
  restoreState();
  let counter = (appStats[`${pageStatus.category}`][numberCard]);
  counter = +counter + 1;
  (appStats[`${pageStatus.category}`][numberCard]) = counter;
  saveState();
}

export const listenerForCards = (card) => {
  card.addEventListener('click', (event) => {
    trainCounter(event.currentTarget.id);
    const str = event.currentTarget.childNodes[0].id;
    playAudioForTrain(str);
    if (event.target.classList.contains('button_reverse')) {
      reverseCard(event.currentTarget);
      event.target.classList.add('button_hidden');
    }
  });
};
