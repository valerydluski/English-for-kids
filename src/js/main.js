/* eslint-disable import/no-cycle */
import {
  pageStatus, emptyArr, appStats, pagesData, mainImages, navigation,
} from './constants';
import listenerForCards from './trainMode';
import {
  listenerForPlayCards, createAudioForPlay, createButtonPlay, createGameOverWindow,
} from './playMode';
import switcherNavigation from './hamburger';
import { createAllWord } from './statsForAllWords';

let difficultWordsCollection;
let difficultWordsArr;

export const saveState = () => {
  localStorage.setItem('pageMode', pageStatus.pageMode);
  localStorage.setItem('category', pageStatus.category);
  localStorage.setItem('Action (set A)', appStats['Action (set A)']);
  localStorage.setItem('Action (set B)', appStats['Action (set B)']);
  localStorage.setItem('Action (set C)', appStats['Action (set C)']);
  localStorage.setItem('Adjective', appStats.Adjective);
  localStorage.setItem('Animal (set A)', appStats['Animal (set A)']);
  localStorage.setItem('Animal (set B)', appStats['Animal (set B)']);
  localStorage.setItem('Clothes', appStats.Clothes);
  localStorage.setItem('Emotion', appStats.Emotion);
  localStorage.setItem('difficultWordsCollection', difficultWordsCollection);
};

export const restoreState = () => {
  pageStatus.pageMode = (localStorage.getItem('pageMode')) ? localStorage.getItem('pageMode') : 'train';
  pageStatus.category = (localStorage.getItem('category')) ? localStorage.getItem('category') : 'Main Page';
  appStats['Action (set A)'] = (localStorage.getItem('Action (set A)')) ? localStorage.getItem('Action (set A)').split(',') : [emptyArr];
  appStats['Action (set B)'] = (localStorage.getItem('Action (set B)')) ? localStorage.getItem('Action (set B)').split(',') : [emptyArr];
  appStats['Action (set C)'] = (localStorage.getItem('Action (set C)')) ? localStorage.getItem('Action (set C)').split(',') : [emptyArr];
  appStats.Adjective = (localStorage.getItem('Adjective')) ? localStorage.getItem('Adjective').split(',') : [emptyArr];
  appStats['Animal (set A)'] = (localStorage.getItem('Animal (set A)')) ? localStorage.getItem('Animal (set A)').split(',') : [emptyArr];
  appStats['Animal (set B)'] = (localStorage.getItem('Animal (set B)')) ? localStorage.getItem('Animal (set B)').split(',') : [emptyArr];
  appStats.Clothes = (localStorage.getItem('Clothes')) ? localStorage.getItem('Clothes').split(',') : [emptyArr];
  appStats.Emotion = (localStorage.getItem('Emotion')) ? localStorage.getItem('Emotion').split(',') : [emptyArr];
  difficultWordsCollection = (localStorage.getItem('difficultWordsCollection')) ? localStorage.getItem('difficultWordsCollection').split(',') : '';
};

const categoryText = document.getElementById('categoryText');

export const navigationLinks = navigation.querySelectorAll('a');
// script for switcher
const switcher = document.getElementById('myonoffswitch');
const buttonStats = document.getElementById('buttonStats');
const statsListener = () => {
  buttonStats.addEventListener('click', () => {
    switcherNavigation();
    createGameOverWindow();
    createAllWord();
  });
};

const navigationChangeBackground = () => {
  const classesNavigation = navigation.classList;
  if (pageStatus.pageMode === 'play') {
    classesNavigation.add('navigation_play');
    classesNavigation.remove('navigation_train');
  } else {
    classesNavigation.remove('navigation_play');
    classesNavigation.add('navigation_train');
  }
};

const changeCardsBackground = (element) => {
  const classes = element.classList;
  if (pageStatus.pageMode === 'play') {
    classes.remove('main-card_train');
    classes.add('main-card_play');
  } else {
    classes.remove('main-card_play');
    classes.add('main-card_train');
  }
};

const changeLinks = (str) => {
  const mainImagesLinks = mainImages.querySelectorAll('a');
  navigationLinks.forEach((element) => {
    const elementItem = element;
    if (!(element.href.includes('index'))) {
      elementItem.href = `${str}.html`;
    }
  });
  mainImagesLinks.forEach((element) => {
    const elementItem = element;
    elementItem.href = `${str}.html`;
  });
};

export const checkActivePage = () => {
  if (window.location.href.includes('train') || window.location.href.includes('play')) {
    return true;
  }
  return false;
};

const changePageMode = (mode) => {
  if (checkActivePage()) {
    if (window.location.href.includes('train')) {
      window.location.href = 'play.html';
    } else {
      window.location.href = 'train.html';
    }
  }
  if (mode) {
    pageStatus.pageMode = 'train';
    saveState();
    changeLinks('train');
  } else {
    pageStatus.pageMode = 'play';
    saveState();
    changeLinks('play');
  }
};

const modeSwitch = (mode) => {
  changePageMode(mode);
  navigationChangeBackground();
  const cards = mainImages.querySelectorAll('.main-card');
  cards.forEach((element) => {
    changeCardsBackground(element);
  });
  changePageMode(mode);
};
switcher.addEventListener('click', (event) => {
  modeSwitch(event.target.checked);
});
// create cards
const createTranslateForTrain = (text, textForTranslate) => {
  const translate = document.createElement('p');
  translate.className = 'train-text';
  text.append(translate);
  translate.classList.add('text-hidden');
  translate.textContent = textForTranslate;
  const reverseButton = document.createElement('img');
  reverseButton.className = 'button_reverse';
  reverseButton.src = './assets/img/reverse.png';
  text.append(reverseButton);
};

const createCardText = (card, textForCard, textForTranslate) => {
  const text = document.createElement('div');
  card.append(text);
  const word = document.createElement('p');
  word.className = 'train-text';
  text.append(word);
  word.textContent = textForCard;

  if (pageStatus.category !== 'Main Page' && pageStatus.pageMode === 'train') {
    createTranslateForTrain(text, textForTranslate);
  }
};

const createCardImage = (element, card, textForCard) => {
  const image = document.createElement('img');
  if (pageStatus.pageMode === 'play') {
    image.className = 'play-image';
  }
  image.src = `./assets/img/${element}`;
  image.id = textForCard;
  card.append(image);
  if (pageStatus.pageMode === 'play' && pageStatus.category !== 'Main Page') {
    createAudioForPlay(textForCard);
  }
};

const createMainCard = (element, textForCard, mode, textForTranslate, index, category) => {
  categoryText.textContent = `${pageStatus.category}`;
  if (checkActivePage()) {
    const wordCard = document.createElement('div');
    wordCard.id = `card${index}`;
    wordCard.className = `${mode}-card`;
    mainImages.append(wordCard);
    createCardImage(element, wordCard, textForCard);
    if (pageStatus.pageMode !== 'play') {
      createCardText(wordCard, textForCard, textForTranslate);
    }
    if (pageStatus.pageMode === 'train') {
      listenerForCards(wordCard, category);
    }
    if (pageStatus.pageMode === 'play') {
      listenerForPlayCards(wordCard, category);
    }
  } else {
    const card = document.createElement('a');
    card.id = `card${index}`;
    card.className = 'main-card';
    card.classList.add(`main-card_${pageStatus.pageMode}`);
    card.href = `${pageStatus.pageMode}.html`;
    mainImages.append(card);
    createCardImage(element, card);
    createCardText(card, textForCard);
  }
};

const deleteCards = () => {
  while (mainImages.hasChildNodes()) {
    mainImages.removeChild(mainImages.firstChild);
  }
};

export const addMainCards = (array, textForCardArr, mode, textForTranslateArr) => {
  if (mainImages.childNodes.length > 0) {
    deleteCards();
  }
  let index = 0;
  array.forEach((element) => {
    const textForCard = textForCardArr[index];
    if (pageStatus.category !== 'Main Page') {
      const textForTranslate = textForTranslateArr[index];
      createMainCard(element, textForCard, mode, textForTranslate, index);
      index += 1;
    } else {
      createMainCard(element, textForCard, mode);
      index += 1;
    }
  });
  if (pageStatus.category !== 'Main Page' && mode === 'play') {
    createButtonPlay();
  }
};
// create dificult words page
const createDifficultWordsArr = () => {
  difficultWordsArr = localStorage.getItem('difficultWordsCollection').split(',');
  const splitWords = () => {
    const word = [];
    for (let i = 0; i < difficultWordsArr.length; i += 3) {
      if (difficultWordsArr[i + 1] !== undefined) {
        word.push([difficultWordsArr[i], difficultWordsArr[i + 1], difficultWordsArr[i + 2]]);
      } else {
        word.push([difficultWordsArr[i]]);
      }
    }
    return word;
  };
  difficultWordsArr = splitWords(difficultWordsArr);
};

const createDifficultWordsPage = () => {
  if (localStorage.getItem('difficultWordsCollection') === '') {
    categoryText.textContent = `${pageStatus.category}`;
    return;
  }
  createDifficultWordsArr();
  if (pageStatus.category !== 'Main Page' && pageStatus.pageMode === 'play') {
    createButtonPlay();
  }
  difficultWordsArr.forEach((element) => {
    const word = element[0];
    const category = element[1];
    const positionInCategory = element[2];
    createMainCard(`${word}.jpg`, word, pageStatus.pageMode, pagesData[`${category}`][2][positionInCategory], positionInCategory, category);
  });
};
// active link
export const activeLink = () => {
  navigationLinks.forEach((element) => {
    element.classList.remove('link_active');
    if (element.textContent === pageStatus.category) {
      element.classList.add('link_active');
    }
  });
};

const checkStatusSwitcer = () => {
  if (pageStatus.pageMode === 'train') {
    switcher.checked = true;
  } else {
    switcher.checked = false;
  }
};

const firstPage = () => {
  if (!checkActivePage()) {
    pageStatus.category = 'Main Page';
    pageStatus.pageMode = 'train';
    saveState();
    statsListener();
  }
};

window.onload = () => {
  restoreState();
  firstPage();
  checkStatusSwitcer();
  const { category } = pageStatus;
  if (category === 'Difficult Words') {
    createDifficultWordsPage();
  } else {
    addMainCards(pagesData[`${category}`][0], pagesData[`${category}`][1], pageStatus.pageMode, pagesData[`${category}`][2]);
  }
  navigationChangeBackground();
  activeLink();
};
