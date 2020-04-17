// script for play mode
import {
  pageStatus, restoreState, saveState, appStats,
} from './main';


let wrapper = document.getElementById('wrapper');
const buttonPlay = document.createElement('img');
const buttonRepeat = document.createElement('img');
let currentAudio;
const indicator = document.createElement('div');
let mistakesCounter;
const audioCollection = [];
export const modal = document.createElement('div');

const playAudioForGame = (audio) => {
  const audioGame = new Audio();
  audioGame.src = `${audio}`;
  audioGame.autoplay = true;
};

const repeatWord = () => {
  playAudioForGame(currentAudio);
};

buttonRepeat.addEventListener('mousedown', () => {
  repeatWord(currentAudio);
});
const createButtonRepeat = () => {
  buttonRepeat.className = 'button_play';
  buttonRepeat.classList.add('button_hidden');
  buttonRepeat.src = './assets/img/repeat.png';
  wrapper.append(buttonRepeat);
};

const createIndicatePanel = () => {
  indicator.className = 'indicator';
  wrapper.append(indicator);
};

const shuffleAudioCollection = () => {
  for (let i = audioCollection.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [audioCollection[i], audioCollection[j]] = [audioCollection[j], audioCollection[i]];
  }
};

const createModalContent = () => {
  if (pageStatus.category !== 'Main Page') {
    const modalImage = document.createElement('img');
    let str;
    const modalText = document.createElement('h2');
    modalText.textContent = `You made ${mistakesCounter} mistake(s)`;
    if (mistakesCounter === 0) {
      str = 'good';
    } else {
      modal.append(modalText);
      str = 'bad';
    }
    modalImage.src = `./assets/img/${str}.png`;
    modal.append(modalImage);
  }
};

const closeModal = (event) => {
  const classes = event.target.classList;
  if (classes.contains('modal__close-icon') || classes.contains('overlay')) {
    document.querySelector('.overlay').remove();
    window.location.href = 'index.html';
  }
};

export const createGameOverWindow = () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  wrapper = document.getElementById('wrapper');
  wrapper.append(overlay);
  modal.className = 'modal';
  overlay.append(modal);
  const closeButton = document.createElement('img');
  closeButton.className = 'modal__close-icon';
  closeButton.src = './assets/img/close.png';
  modal.append(closeButton);
  overlay.addEventListener('click', closeModal);
  if (pageStatus.pageMode === 'play') {
    createModalContent();
  }
};

const gameOver = () => {
  if (mistakesCounter === 0) {
    playAudioForGame('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/success.mp3');
  } else {
    playAudioForGame('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/failure.mp3');
  }
  createGameOverWindow();
};


const audioChoice = () => {
  currentAudio = audioCollection.pop();
  if (currentAudio === undefined && pageStatus.category !== 'Main Page' && pageStatus.pageMode === 'play') {
    gameOver();
  } else {
    playAudioForGame(currentAudio);
  }
};

export const startPlay = (audio) => {
  shuffleAudioCollection(audio);
  mistakesCounter = 0;
  buttonPlay.classList.add('button_hidden');
  buttonRepeat.classList.remove('button_hidden');
  audioChoice(audio);
};

export const createButtonPlay = () => {
  createIndicatePanel();
  buttonPlay.className = 'button_play';
  buttonPlay.src = './assets/img/play.png';
  wrapper.append(buttonPlay);
  createButtonRepeat();
  buttonPlay.addEventListener('click', startPlay);
};


export const createAudioForPlay = (str) => {
  audioCollection.push(`https://wooordhunt.ru//data/sound/word/us/mp3/${str}.mp3`);
};


const addAnswerIndicator = (bool) => {
  let typeAnswer;
  if (bool) {
    typeAnswer = 'correct';
  } else {
    typeAnswer = 'notcorrect';
  }
  if (indicator.childElementCount > 7) {
    indicator.firstChild.remove();
  }
  const answerIndicator = document.createElement('img');
  answerIndicator.className = 'answer';
  answerIndicator.src = `./assets/img/${typeAnswer}.png`;
  indicator.append(answerIndicator);
};

const playCounter = (id, isAnswer, category) => {
  let cardCategory = category;
  if (pageStatus.category !== 'Difficult Words') {
    cardCategory = pageStatus.category;
  }
  let numberCard = id.slice(4);
  restoreState();
  if (isAnswer) {
    numberCard = +numberCard + 8;
    let counter = (appStats[`${cardCategory}`][numberCard]);
    counter = +counter + 1;
    (appStats[`${cardCategory}`][numberCard]) = counter;
    saveState();
  } else {
    numberCard = +numberCard + 16;
    let counter = (appStats[`${cardCategory}`][numberCard]);
    counter = +counter + 1;
    (appStats[`${cardCategory}`][numberCard]) = counter;
    saveState();
  }
};

const checkAnswer = (id, target, currentTarget, category) => {
  if (target.classList.contains('not-active-card') || currentAudio === undefined || target.classList.contains('play-card')) {
    return;
  }
  if (currentAudio.includes(id)) {
    playCounter(currentTarget, true, category);
    addAnswerIndicator(true);
    playAudioForGame('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/correct.mp3');
    setTimeout(() => audioChoice(audioCollection), 1000);
    target.classList.add('not-active-card');
  } else {
    playCounter(currentTarget, false, category);
    mistakesCounter += 1;
    addAnswerIndicator(false);
    playAudioForGame('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/error.mp3');
  }
};

export const listenerForPlayCards = (card, category) => {
  card.addEventListener('click', (event) => {
    checkAnswer(event.target.id, event.target, event.currentTarget.id, category);
  });
};
