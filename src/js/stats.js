import { createGameOverWindow, modal } from './playMode';
import {
  pagesData, appStats, restoreState, navigation
} from './main';
import { createAllWord } from './allWords';
import { hamburger } from './hamburger';

const buttonStats = document.getElementById('buttonStats');

const deleteChild = (arr) => {
  while (arr.length > 1) {
    modal.removeChild(modal.lastChild);
  }
};

const createModalLink = (target, isCategories) => {
  const categoriesLink = document.createElement('div');
  categoriesLink.className = 'category-stats';
  categoriesLink.classList.add('categories-link');
  if (isCategories) {
    categoriesLink.textContent = 'Categories';
    modal.append(categoriesLink);
    categoriesLink.addEventListener('click', () => {
      deleteChild(modal.childNodes);
      createCategoriesModal(pagesData.categories);
    });
  } else {
    categoriesLink.textContent = `${target.textContent}`;
    modal.append(categoriesLink);
    categoriesLink.addEventListener('click', () => {
      deleteChild(modal.childNodes);
      createThisCategory(target);
    });
  }
};

const createCategoryWords = (target) => {
  deleteChild(modal.childNodes);
  createModalLink(target, true);
  createThisCategory(target);
};

const createStatsCategory = (element) => {
  let elem = element;
  if (element === 'Main Page') {
    elem = 'All Words';
  }
  const statsCategory = document.createElement('div');
  statsCategory.className = 'category-stats';
  statsCategory.textContent = `${elem}`;
  modal.append(statsCategory);
  statsCategory.addEventListener('click', (event) => {
    createCategoryWords(event.target);
  });
};

const createCategoriesModal = (arr) => {
  deleteChild(modal.childNodes);
  arr.forEach((element) => {
    createStatsCategory(element);
  });
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
    correct = Number(correct);
    wrong = Number(wrong);
    const countPercent = Math.ceil((correct / (correct + wrong)) * 100);

    const percent = document.createElement('div');
    percent.className = 'category-name';
    percent.textContent = `percent: ${countPercent}%`;
    modal.append(percent);
  }
};

const createAllWordsInfo = (index, category) => {
  restoreState();
  createTranslateModal(pagesData[`${category}`][2][index]);
  createTrainCount(appStats[`${category}`][index]);
  createPlayCount(appStats[`${category}`][index + 8], appStats[`${category}`][index + 16]);
};


const createStatsThisWords = (eventTarget, index, target) => {
  deleteChild(modal.childNodes);
  createModalLink(target, false, event.target);
  createNamePage(eventTarget.textContent);
  createAllWordsInfo(index, target.textContent);
};

const createStatsWords = (element, index, target) => {
  const statsWord = document.createElement('div');
  statsWord.className = 'category-stats';
  statsWord.textContent = `${element}`;
  statsWord.id = index;
  modal.append(statsWord);
  statsWord.addEventListener('click', (event) => {
    createStatsThisWords(event.target, index, target);
  });
};

const createWordsModal = (arr, target) => {
  let index = 0;
  arr.forEach((element) => {
    createStatsWords(element, index, target);
    index += 1;
  });
};

const createNamePage = (text) => {
  const statsCategory = document.createElement('div');
  statsCategory.className = 'category-name';
  statsCategory.textContent = text;
  modal.append(statsCategory);
};

const createAllStats = () => {
  createAllWord();
};

const createThisCategory = (target) => {
  if (target.textContent === 'All Words') {
    createAllStats();
    return;
  }
  createNamePage(target.textContent);
  const words = pagesData[`${target.textContent}`][1];
  createWordsModal(words, target);
};


export const statsListener = () => {
  buttonStats.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburger.classList.add('not-active');
    navigation.classList.remove('navigation-active');
    createGameOverWindow();
    createCategoriesModal(pagesData.categories);
  });
};
