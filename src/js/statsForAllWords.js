/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { emptyArr, appStats, pagesData } from './constants';
import {
  restoreState, saveState,
} from './main';
import { modal } from './playMode';

const allWords = {};
let tableForAllStats;
let resetListener;
// eslint-disable-next-line import/no-mutable-exports
export let createAllWord;
let difficultListener;
let difficultWords;
class Words {
  constructor(name, category, translate, train, correct, error, positionInCategory) {
    this.name = name;
    this.category = category;
    this.translate = translate;
    this.train = train;
    this.correct = Number(correct);
    this.error = Number(error);

    if ((this.correct + this.error) === 0) {
      this.percent = 0;
    } else {
      this.percent = Math.ceil(((this.correct) / ((this.correct) + (this.error))) * 100);
    }
    this.positionInCategory = positionInCategory;
  }
}
const arrForTableHeader = ['word', 'category', 'translate', 'train', 'correct', 'error', 'percent'];
const sortAlphabet = (object) => {
  const newObject = {};
  Object.keys(object).sort().forEach((name) => { newObject[name] = object[name]; });
  return newObject;
};

const sortAlphabetReverse = (object) => {
  const newObject = {};
  Object.keys(object).sort().reverse().forEach((name) => { newObject[name] = object[name]; });
  return newObject;
};

const DigitalSort = (obj, type) => Object.values(obj).sort((a, b) => b[type] - a[type]);

const DigitalSortReverse = (obj, type) => Object.values(obj).sort((a, b) => a[type] - b[type]);

let isWordSort = false;
let isDigitalSort = false;

const tableDeleteChild = () => {
  while (tableForAllStats.childElementCount > 7) {
    tableForAllStats.removeChild(tableForAllStats.lastChild);
  }
};
const modalDeleteChild = () => {
  while (modal.childElementCount > 1) {
    modal.removeChild(modal.lastChild);
  }
};

const createComponent = (parent, elementClass, text, id) => {
  const tag = document.createElement('div');
  tag.className = `${elementClass}`;
  if (text !== undefined) {
    tag.textContent = `${text}`;
  }
  parent.append(tag);
  if (id !== undefined) {
    tag.id = `${id}`;
  }
  return tag;
};

const createAllStatsLink = () => {
  modalDeleteChild();
  createComponent(modal, 'category-stats', 'All stats').addEventListener('click', () => {
    modalDeleteChild();
    createAllWord();
  });
};

const createNamePage = (text) => {
  createComponent(modal, 'category-name', text);
};

const createTranslateModal = (text) => {
  createComponent(modal, 'category-name', `translate: ${text}`);
};

const createTrainCount = (text) => {
  createComponent(modal, 'category-name', `train: ${text}`);
};

const createPlayCount = (correct, wrong, percent) => {
  createComponent(modal, 'category-name', `correct: ${correct}`);
  createComponent(modal, 'category-name', `wrong: ${wrong}`);
  if (percent !== 0) {
    createComponent(modal, 'category-name', `percent: ${percent}%`);
  }
};

const createAllWordsInfo = (word) => {
  restoreState();
  createTranslateModal(allWords[`${word}`].translate);
  createTrainCount(allWords[`${word}`].train);
  createPlayCount(allWords[`${word}`].correct, allWords[`${word}`].error, allWords[`${word}`].percent);
};

const createStatsThisWords = (word) => {
  modalDeleteChild();
  createAllStatsLink();
  createNamePage(word);
  createAllWordsInfo(word);
};

const createStatsWords = (element, index) => {
  createComponent(modal, 'category-stats', element, index).addEventListener('click', (event) => {
    createStatsThisWords(event.target.textContent);
  });
};

const createWordsModal = (arr, target) => {
  let index = 0;
  arr.forEach((element) => {
    createStatsWords(element, index, target);
    index += 1;
  });
};

const createCategoryWords = (category) => {
  modalDeleteChild();
  createAllStatsLink();
  createNamePage(category);
  const words = pagesData[`${category}`][1];
  createWordsModal(words, category);
};


const createElementTable = (text, key) => {
  if (text === 'word') {
    createComponent(tableForAllStats, 'table_element table_header', text);
    return;
  }
  if (key === 'category') {
    createComponent(tableForAllStats, 'table_element table_header', text).addEventListener('click', () => {
      createCategoryWords(text);
    });
    return;
  }
  if (key === 'name') {
    createComponent(tableForAllStats, 'table_element table_header', text).addEventListener('click', () => {
      createStatsThisWords(text);
    });
    return;
  }
  createComponent(tableForAllStats, 'table_element', text);
};

const createAllWordsFields = (object) => {
  Object.keys(object).forEach((key) => {
    if (key === 'positionInCategory') {
      return;
    }
    createElementTable(object[`${key}`], key);
  });
};

const createAllWordsStats = (object) => {
  Object.keys(object).forEach((key) => {
    const word = object[`${key}`];
    createAllWordsFields(word);
  });
};

const clickerHeader = (event) => {
  const digitalSortParametr = ['train', 'correct', 'error', 'percent'];
  const targetId = event.target.id;
  if (targetId === 'word' && !(isWordSort)) {
    tableDeleteChild();
    createAllWordsStats(sortAlphabet(allWords));
    isWordSort = true;
    return;
  }
  if (targetId === 'word' && isWordSort) {
    tableDeleteChild();
    createAllWordsStats(sortAlphabetReverse(allWords));
    isWordSort = false;
  }
  if (digitalSortParametr.includes(targetId) && !(isDigitalSort)) {
    tableDeleteChild();
    createAllWordsStats(DigitalSortReverse(allWords, targetId));
    isDigitalSort = true;
    return;
  }
  if (digitalSortParametr.includes(targetId) && isDigitalSort) {
    tableDeleteChild();
    createAllWordsStats(DigitalSort(allWords, targetId));
    isDigitalSort = false;
  }
};

const createHeaderTableElement = (element) => {
  createComponent(tableForAllStats, 'table_element table_header', element, element).addEventListener('click', (event) => {
    clickerHeader(event);
  });
};

const createDifficultWordsCollection = (colletion) => {
  difficultWords = [];
  for (let i = 0; i < 8; i += 1) {
    if (colletion[i].error !== 0) {
      difficultWords.push(colletion[i].name);
      difficultWords.push(colletion[i].category);
      difficultWords.push(colletion[i].positionInCategory);
    }
  }
  localStorage.setItem('difficultWordsCollection', difficultWords);
  localStorage.setItem('category', 'Difficult Words');
  window.location.href = 'train.html';
};

// eslint-disable-next-line prefer-const
difficultListener = () => {
  const difficultButton = document.getElementById('button-difficult');
  difficultButton.addEventListener('click', () => {
    createDifficultWordsCollection(DigitalSort(allWords, 'error'));
  });
};

const createButton = (tag) => {
  const button = document.createElement('img');
  button.className = `modal__${tag}-icon`;
  button.src = `./assets/img/${tag}.png`;
  button.id = `button-${tag}`;
  modal.append(button);
};

const createDifficultButton = () => {
  createButton('difficult');
  difficultListener();
};

const createResetButton = () => {
  createButton('reset');
  resetListener();
};

const createAllStatsHeader = () => {
  modal.classList.add('modal_all-stats');
  createDifficultButton();
  createResetButton();
  tableForAllStats = createComponent(modal, 'table_stats');
  arrForTableHeader.forEach((element) => {
    createHeaderTableElement(element);
  });
  createAllWordsStats(allWords);
};

createAllWord = () => {
  pagesData.categories.forEach((category) => {
    let index = 0;
    if (category !== 'Main Page') {
      restoreState();
      pagesData[`${category}`][1].forEach((word) => {
        const translate = pagesData[`${category}`][2][index];
        const trainCounter = appStats[`${category}`][index];
        const correctCounter = appStats[`${category}`][index + 8];
        const errorCounter = appStats[`${category}`][index + 16];
        allWords[`${word}`] = new Words(word, category, translate, trainCounter, correctCounter, errorCounter, index);
        index += 1;
      });
    }
  });
  createAllStatsHeader();
};

const resetStats = () => {
  Object.keys(appStats).forEach((key) => { appStats[key] = emptyArr; });
  return appStats;
};

resetListener = () => {
  const resetButton = document.getElementById('button-reset');
  resetButton.addEventListener('click', () => {
    restoreState();
    resetStats();
    saveState();
    modalDeleteChild();
    createAllWord();
  });
};
