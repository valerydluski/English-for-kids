import listenerForCards from './trainMode';
import {
  listenerForPlayCards, createAudioForPlay, createButtonPlay, createGameOverWindow,
} from './playMode';
import switcherNavigation from './hamburger';
import createAllWord from './statsForAllWords';


export const pageStatus = {
  pageMode: '',
  category: '',
};
export const emptyArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
export const appStats = {
  'Action (set A)': [],

  'Action (set B)': [],

  'Action (set C)': [],

  Adjective: [],

  'Animal (set A)': [],

  'Animal (set B)': [],

  Clothes: [],

  Emotion: [],
};

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
};

export const pagesData = {
  categories: ['Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'],

  'Main Page': [['dance.jpg', 'open.jpg', 'play.jpg', 'cold.jpg', 'bird.jpg', 'chicken.jpg', 'blouse.jpg', 'happy.jpg'],
    ['Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion']],
  'Action (set A)': [['cry.jpg', 'dance.jpg', 'dive.jpg', 'draw.jpg', 'sit.jpg', 'jump.jpg', 'laugh.jpg', 'fly.jpg'],
    ['cry', 'dance', 'dive', 'draw', 'sit', 'jump', 'laugh', 'fly'],
    ['плакать', 'танцевать', 'нырять', 'рисовать', 'сидеть', 'прыгать', 'смеяться', 'летать']],

  'Action (set B)': [['open.jpg', 'point.jpg', 'skip.jpg', 'smile.jpg', 'ride.jpg', 'swim.jpg', 'sing.jpg', 'eat.jpg'],
    ['open', 'point', 'skip', 'smile', 'ride', 'swim', 'sing', 'eat'],
    ['открыть', 'указывать', 'скакать', 'улыбаться', 'ездить', 'плавать', 'петь', 'есть']],

  'Action (set C)': [['play.jpg', 'build.jpg', 'break.jpg', 'hit.jpg', 'cut.jpg', 'walk.jpg', 'read.jpg', 'hug.jpg'],
    ['play', 'build', 'break', 'hit', 'cut', 'walk', 'read', 'hug'],
    ['играть', 'строить', 'ломать', 'ударять', 'резать', 'ходить', 'читать', 'обнимать']],

  Adjective: [['cold.jpg', 'dirty.jpg', 'big.jpg', 'little.jpg', 'long.jpg', 'sweet.jpg', 'hot.jpg', 'funny.jpg'],
    ['cold', 'dirty', 'big', 'little', 'long', 'sweet', 'hot', 'funny'],
    ['холодный', 'грязный', 'большой', 'маленький', 'длинный', 'сладкий', 'горячий', 'забавный']],

  'Animal (set A)': [['bird.jpg', 'cat.jpg', 'chick.jpg', 'dog.jpg', 'dolphin.jpg', 'fish.jpg', 'frog.jpg', 'giraffe.jpg'],
    ['bird', 'cat', 'chick', 'dog', 'dolphin', 'fish', 'frog', 'giraffe'],
    ['птица', 'кот', 'цыплёнок', 'собака', 'дельфин', 'рыба', 'лягушка', 'жираф']],

  'Animal (set B)': [['chicken.jpg', 'horse.jpg', 'lion.jpg', 'mouse.jpg', 'pig.jpg', 'rabbit.jpg', 'sheep.jpg', 'turtle.jpg'],
    ['chicken', 'horse', 'lion', 'mouse', 'pig', 'rabbit', 'sheep', 'turtle'],
    ['курица', 'лошадь', 'лев', 'мышь', 'свинья', 'кролик', 'овечка', 'черепаха']],

  Clothes: [['blouse.jpg', 'boot.jpg', 'coat.jpg', 'dress.jpg', 'shirt.jpg', 'shoe.jpg', 'skirt.jpg', 'pants.jpg'],
    ['blouse', 'boot', 'coat', 'dress', 'shirt', 'shoe', 'skirt', 'pants'],
    ['блузка', 'ботинок', 'пальто', 'платье', 'рубашка', 'ботинок', 'юбка', 'брюки']],

  Emotion: [['angry.jpg', 'happy.jpg', 'sad.jpg', 'scared.jpg', 'tired.jpg', 'surprised.jpg', 'regret.jpg', 'shy.jpg'],
    ['angry', 'happy', 'sad', 'scared', 'tired', 'surprised', 'regret', 'shy'],
    ['сердитый', 'счастливая', 'грустный', 'напугана', 'устала', 'удивлены', 'сожалеем', 'стесняется']],
};

const categoryText = document.getElementById('categoryText');
export const mainImages = document.getElementById('main-images');
export const navigation = document.getElementById('navigation');
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

const checkStatusSwitcer = () => {
  if (pageStatus.pageMode === 'train') {
    switcher.checked = true;
  } else {
    switcher.checked = false;
  }
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
  image.src = `./assets/img/${element}`;
  image.id = textForCard;
  card.append(image);
  if (pageStatus.pageMode === 'play' && pageStatus.category !== 'Main Page') {
    createAudioForPlay(textForCard);
  }
};

const createMainCard = (element, textForCard, mode, textForTranslate, index) => {
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
      listenerForCards(wordCard);
    }
    if (pageStatus.pageMode === 'play') {
      listenerForPlayCards(wordCard);
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
// active link
export const activeLink = () => {
  navigationLinks.forEach((element) => {
    element.classList.remove('link_active');
    if (element.textContent === pageStatus.category) {
      element.classList.add('link_active');
    }
  });
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
  addMainCards(pagesData[`${category}`][0], pagesData[`${category}`][1], pageStatus.pageMode, pagesData[`${category}`][2]);
  navigationChangeBackground();
  activeLink();
};
