// script for play mode
import { audioCollection, pageStatus } from './main';


let currentAudio;

export const createAudioForPlay = (str) => {
  audioCollection.push(`https://wooordhunt.ru//data/sound/word/us/mp3/${str}.mp3`);
};

const shuffleAudioCollection = () => {
  for (let i = audioCollection.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [audioCollection[i], audioCollection[j]] = [audioCollection[j], audioCollection[i]];
  }
};

const playAudioForGame = (currentAudio) => {
  const audioGame = new Audio();
  audioGame.src = `${currentAudio}`;
  audioGame.autoplay = true;
};

const closeModal = (event) => {
  const classes = event.target.classList;
  if (classes.contains('overlay') || classes.contains('modal__close-icon')) {
    document.querySelector('.overlay').remove();
  }
};

const createGameOverWindow = () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const wrapper = document.getElementById('wrapper');
  console.log(wrapper);
  wrapper.append(overlay);
  const modal = document.createElement('div');
  modal.className = 'modal';
  overlay.append(modal);
  const closeButton = document.createElement('img');
  closeButton.className = 'modal__close-icon';
  closeButton.src = '/src/assets/img/close.png';
  modal.append(closeButton);
  overlay.addEventListener('click', closeModal);
};

const gameOver = () => {
  createGameOverWindow();
  playAudioForGame('https://wooordhunt.ru//data/sound/word/us/mp3/game.mp3');
  setTimeout(() => playAudioForGame('https://wooordhunt.ru//data/sound/word/us/mp3/over.mp3'), 1000);
};

const audioChoice = () => {
  currentAudio = audioCollection.pop();
  if (currentAudio === undefined && pageStatus.category !== 'Main Page' && pageStatus.pageMode === 'play') {
    gameOver();
  } else {
    playAudioForGame(currentAudio);
  }
};

const checkAnswer = (target) => {
  if (currentAudio.includes(target)) {
    audioChoice(audioCollection);
  }
};

export const listenerForPlayCards = (card) => {
  card.addEventListener('click', (event) => {
    checkAnswer(event.target.id);
  });
};

export const startPlay = (audioCollection) => {
  shuffleAudioCollection(audioCollection);
  audioChoice(audioCollection);
};
