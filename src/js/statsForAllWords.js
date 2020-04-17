import {
  pagesData, appStats, restoreState, saveState, emptyArr,
} from './main';
import { modal } from './playMode';

const allWords = {};
let tableForAllStats;
let resetListener;
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

const DigitalSort = (object) => Object.values(object).sort((a, b) => b.train - a.train);

const DigitalSortReverse = (object) => Object.values(object).sort((a, b) => a.train - b.train);

const correctSort = (object) => Object.values(object).sort((a, b) => b.correct - a.correct);

const correctSortReverse = (object) => Object.values(object).sort((a, b) => a.correct - b.correct);

const errorSort = (object) => Object.values(object).sort((a, b) => b.error - a.error);

const errorSortReverse = (object) => Object.values(object).sort((a, b) => a.error - b.error);

const percentSort = (object) => Object.values(object).sort((a, b) => b.percent - a.percent);

const percentSortReverse = (object) => Object.values(object).sort((a, b) => a.percent - b.percent);

let isWordSort = false;
let isTrainSort = false;
let isCorrectSort = false;
let isErorrSort = false;
let isPercentSort = false;
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

const createAllStatsLink = () => {
  modalDeleteChild();
  const allStatsLink = document.createElement('div');
  allStatsLink.className = 'category-stats';
  allStatsLink.textContent = 'All stats';
  modal.append(allStatsLink);
  allStatsLink.addEventListener('click', () => {
    modalDeleteChild();
    createAllWord();
  });
};

const createNamePage = (text) => {
  const statsCategory = document.createElement('div');
  statsCategory.className = 'category-name';
  statsCategory.textContent = text;
  modal.append(statsCategory);
};

const createTranslateModal = (text) => {
  const translate = document.createElement('div');
  translate.className = 'category-name';
  translate.textContent = `translate: ${text}`;
  modal.append(translate);
};

const createTrainCount = (text) => {
  const trainCount = document.createElement('div');
  trainCount.className = 'category-name';
  trainCount.textContent = `train: ${text}`;
  modal.append(trainCount);
};

const createPlayCount = (correct, wrong) => {
  const correctCount = document.createElement('div');
  const wrongCount = document.createElement('div');
  correctCount.className = 'category-name';
  wrongCount.className = 'category-name';
  correctCount.textContent = `correct: ${correct}`;
  wrongCount.textContent = `wrong: ${wrong}`;
  modal.append(correctCount);
  modal.append(wrongCount);
  if ((+correct + wrong) > 0) {
    const correctCounter = Number(correct);
    const errorCounter = Number(wrong);
    const countPercent = Math.ceil((correctCounter / (correctCounter + errorCounter)) * 100);
    const percent = document.createElement('div');
    percent.className = 'category-name';
    percent.textContent = `percent: ${countPercent}%`;
    modal.append(percent);
  }
};

const createAllWordsInfo = (word) => {
  restoreState();
  createTranslateModal(allWords[`${word}`].translate);
  createTrainCount(allWords[`${word}`].train);
  createPlayCount(allWords[`${word}`].correct, allWords[`${word}`].error);
};

const createStatsThisWords = (word) => {
  modalDeleteChild();
  createAllStatsLink();
  createNamePage(word);
  createAllWordsInfo(word);
};

const createStatsWords = (element, index) => {
  const statsWord = document.createElement('div');
  statsWord.className = 'category-stats';
  statsWord.textContent = `${element}`;
  statsWord.id = index;
  modal.append(statsWord);
  statsWord.addEventListener('click', (event) => {
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
  const elementTable = document.createElement('div');
  elementTable.className = 'table_element';
  if (text === 'word') {
    elementTable.classList.add('table_header');
  }
  if (key === 'category') {
    elementTable.classList.add('table_header');
    elementTable.addEventListener('click', () => {
      createCategoryWords(text);
    });
  }
  if (key === 'name') {
    elementTable.classList.add('table_header');
    elementTable.addEventListener('click', () => {
      createStatsThisWords(text);
    });
  }
  elementTable.textContent = `${text}`;
  tableForAllStats.append(elementTable);
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

const clickerHeader = () => {
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
  if (targetId === 'train' && !(isTrainSort)) {
    tableDeleteChild();
    createAllWordsStats(DigitalSortReverse(allWords, targetId));
    isTrainSort = true;
    return;
  }
  if (targetId === 'train' && isTrainSort) {
    tableDeleteChild();
    createAllWordsStats(DigitalSort(allWords, targetId));
    isTrainSort = false;
  }
  if (targetId === 'correct' && !(isCorrectSort)) {
    tableDeleteChild();
    createAllWordsStats(correctSort(allWords, targetId));
    isCorrectSort = true;
    return;
  }
  if (targetId === 'correct' && isCorrectSort) {
    tableDeleteChild();
    createAllWordsStats(correctSortReverse(allWords, targetId));
    isCorrectSort = false;
  }
  if (targetId === 'error' && !(isErorrSort)) {
    tableDeleteChild();
    createAllWordsStats(errorSort(allWords, targetId));
    isErorrSort = true;
    return;
  }
  if (targetId === 'error' && isErorrSort) {
    tableDeleteChild();
    createAllWordsStats(errorSortReverse(allWords, targetId));
    isErorrSort = false;
  }
  if (targetId === 'percent' && !(isPercentSort)) {
    tableDeleteChild();
    createAllWordsStats(percentSort(allWords, targetId));
    isPercentSort = true;
    return;
  }
  if (targetId === 'percent' && isPercentSort) {
    tableDeleteChild();
    createAllWordsStats(percentSortReverse(allWords, targetId));
    isPercentSort = false;
  }
};

const createHeaderTableElement = (element) => {
  const headerElement = document.createElement('div');
  headerElement.className = 'table_element';
  headerElement.classList.add('table_header');
  headerElement.id = `${element}`;
  headerElement.textContent = `${element}`;
  headerElement.addEventListener('click', (event) => {
    clickerHeader(event.target);
  });
  tableForAllStats.append(headerElement);
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

difficultListener = () => {
  const difficultButton = document.getElementById('buttonDifficult');
  difficultButton.addEventListener('click', () => {
    createDifficultWordsCollection(errorSort(allWords));
  });
};

const createDifficultButton = () => {
  const difficultButton = document.createElement('img');
  difficultButton.className = 'modal__difficult-icon';
  difficultButton.src = './assets/img/difficult.png';
  difficultButton.id = 'buttonDifficult';
  modal.append(difficultButton);
  difficultListener();
};

const createResetButton = () => {
  const resetButton = document.createElement('img');
  resetButton.className = 'modal__reset-icon';
  resetButton.src = './assets/img/reset.png';
  resetButton.id = 'buttonReset';
  modal.append(resetButton);
  resetListener();
};

const createAllStatsHeader = () => {
  modal.classList.add('modal_all-stats');
  createDifficultButton();
  createResetButton();
  tableForAllStats = document.createElement('div');
  tableForAllStats.className = 'table_stats';
  modal.append(tableForAllStats);
  arrForTableHeader.forEach((element) => {
    createHeaderTableElement(element);
  });
  createAllWordsStats(allWords);
};

createAllWord = () => {
  pagesData.categories.forEach((category) => {
    
    let index = 0;
    if (category !== 'Main Page') {
      pagesData[`${category}`][1].forEach((word) => {
        restoreState();
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
  const resetButton = document.getElementById('buttonReset');
  resetButton.addEventListener('click', () => {
    restoreState();
    resetStats();
    saveState();
    modalDeleteChild();
    createAllWord();
  });
};
