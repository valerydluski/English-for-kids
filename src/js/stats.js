import { createGameOverWindow, modal } from './playMode';
import { pagesData } from './main';

const buttonStats = document.getElementById('buttonStats');

const deleteChild = (arr) => {
  while (arr.length > 1) {
    modal.removeChild(modal.lastChild);
  }
};

const createModalLink = (target, isCategories, str) => {
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

const createTranslateModal = (text) => {
  const translate = document.createElement('div');
  translate.className = 'category-name';
  translate.textContent = `translate: ${text}`;
  modal.append(translate);
};

const createAllWordsInfo = (index, category) => {
  console.log(index, category);
  createTranslateModal(pagesData[`${category}`][2][index]);
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

const createThisCategory = (target) => {
  createNamePage(target.textContent);
  const words = pagesData[`${target.textContent}`][1];
  createWordsModal(words, target);
};

const createCategoryWords = (target) => {
  deleteChild(modal.childNodes);
  createModalLink(target, true);
  createThisCategory(target);
};

const createStatsCategory = (element) => {
  if (element === 'Main Page') {
    return;
  }
  const statsCategory = document.createElement('div');
  statsCategory.className = 'category-stats';
  statsCategory.textContent = `${element}`;
  modal.append(statsCategory);
  statsCategory.addEventListener('click', (event) => {
    createCategoryWords(event.target);
  });
};

const createCategoriesModal = (arr) => {
  arr.forEach((element) => {
    createStatsCategory(element);
  });
};


buttonStats.addEventListener('click', () => {
  createGameOverWindow();
  createCategoriesModal(pagesData.categories);
});
