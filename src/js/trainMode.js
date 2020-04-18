/* eslint-disable import/no-cycle */
import { pageStatus, appStats } from './constants';
import {
  saveState, restoreState,
} from './main';

// reverse card
const hideTranslate = (child) => {
  child[1].classList.add('text-hidden');
  child[0].classList.remove('text-hidden');
  child[2].classList.remove('button_hidden');
};

const reverseCardBeginState = ({ currentTarget }) => {
  currentTarget.classList.add('run-animation');
  function deleteAnimation() {
    currentTarget.classList.remove('run-animation');
  }
  setTimeout(deleteAnimation, 1000);
  hideTranslate(currentTarget.childNodes[1].childNodes);
  currentTarget.removeEventListener('mouseleave', reverseCardBeginState);
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

const trainCounter = (id, category) => {
  let cardCategory = category;
  if (category === undefined) {
    cardCategory = pageStatus.category;
  }
  const numberCard = id.slice(4);
  restoreState();
  let counter = (appStats[`${cardCategory}`][numberCard]);
  counter = +counter + 1;
  (appStats[`${cardCategory}`][numberCard]) = counter;
  saveState();
};

const listenerForCards = (card, category) => {
  card.addEventListener('click', (event) => {
    trainCounter(event.currentTarget.id, category);
    const str = event.currentTarget.childNodes[0].id;
    playAudioForTrain(str);
    if (event.target.classList.contains('button_reverse')) {
      reverseCard(event.currentTarget);
      event.target.classList.add('button_hidden');
    }
  });
};

export default listenerForCards;
