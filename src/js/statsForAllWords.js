import {
  pagesData, appStats, restoreState, saveState, emptyArr,
} from './main';
import { modal } from './playMode';

const allWords = {};
let tableForAllStats;
class Words {
  constructor(name, category, translate, train, correct, error) {
    this.name = name;
    this.category = category;
    this.translate = translate;
    this.train = train;
    this.correct = correct;
    this.error = error;
  }
}
const arrForTableHeader = ['word', 'category', 'translate', 'train', 'correct', 'error', 'percent'];
const sortAlphabet = (object) => {
  const newObject = {};
  Object.keys(object).sort().forEach((name) => { newObject[name] = object[name]; });
  return newObject;
};
let isWordSort = false;
const tableDeleteChild = () => {
  while (tableForAllStats.childElementCount > 7) {
    tableForAllStats.removeChild(tableForAllStats.lastChild);
  }
};
const modalDeleteChild = () => {
  while (modal.childElementCount > 2) {
    modal.removeChild(modal.lastChild);
  }
};

const createAllStatsLink = () => {
  console.log('link back');
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
    createElementTable(object[`${key}`], key);
  });
};

const createWordsPercentField = (word) => {
  const correct = Number(word.correct);
  const error = Number(word.error);
  if ((correct + error) === 0) {
    createElementTable('-');
  } else {
    const countPercent = Math.ceil((correct / (correct + error)) * 100);
    createElementTable(countPercent);
  }
};

const createAllWordsStats = (object) => {
  Object.keys(object).forEach((key) => {
    const word = object[`${key}`];
    createAllWordsFields(word);
    createWordsPercentField(word);
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
    createAllWordsStats(allWords);
    isWordSort = false;
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
  createResetButton();
  tableForAllStats = document.createElement('div');
  tableForAllStats.className = 'table_stats';
  modal.append(tableForAllStats);
  arrForTableHeader.forEach((element) => {
    createHeaderTableElement(element);
  });
  createAllWordsStats(allWords);
};

const createAllWord = () => {
  pagesData.categories.forEach((category) => {
    let index = 0;
    if (category !== 'Main Page') {
      pagesData[`${category}`][1].forEach((word) => {
        const translate = pagesData[`${category}`][2][index];
        const trainCounter = appStats[`${category}`][index];
        const correctCounter = appStats[`${category}`][index + 8];
        const errorCounter = appStats[`${category}`][index + 16];
        allWords[`${word}`] = new Words(word, category, translate, trainCounter, correctCounter, errorCounter);
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

const resetListener = () => {
  const resetButton = document.getElementById('buttonReset');
  resetButton.addEventListener('click', () => {
    restoreState();
    resetStats();
    saveState();
    modalDeleteChild();
    createAllWord();
  });
};

export default createAllWord;
