import {
  pagesData, appStats,
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

const createElementTable = (text) => {
  const elementTable = document.createElement('div');
  elementTable.className = 'table_element';
  elementTable.classList.add('table_header');
  elementTable.textContent = `${text}`;
  tableForAllStats.append(elementTable);
};

const createAllWordsStats = (object) => {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const word = object[`${key}`];
      for (const keyWord in word) {
        createElementTable(word[`${keyWord}`]);
      }
      const correct = Number(word.correct);
      const error = Number(word.error);
      if ((correct + error) === 0) {
        createElementTable('-');
      } else {
        const countPercent = Math.ceil((correct / (correct + error)) * 100);
        createElementTable(countPercent);
      }
    }
  }
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

const createAllStatsHeader = () => {
  modal.classList.add('modal_all-stats');
  tableForAllStats = document.createElement('div');
  tableForAllStats.className = 'table_stats';
  modal.append(tableForAllStats);
  arrForTableHeader.forEach((element) => {
    createHeaderTableElement(element);
  });
  createAllWordsStats(allWords);
};

export const createAllWord = () => {
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