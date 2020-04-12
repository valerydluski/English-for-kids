import {
  pageStatus, saveState, restoreState, addMainCards, pagesData, checkActivePage, activeLink,
} from './main';

// change category
const mainImages = document.getElementById('main-images');
const navigation = document.getElementById('navigation');

const changeCategory = (str) => {
  restoreState();
  pageStatus.category = str;
  saveState();
};

navigation.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('navigation__link')) {
    changeCategory(event.target.textContent);

    // eslint-disable-next-line eqeqeq
    if (window.location.href != event.target.href) {
      window.location.href = event.target.href;
    }
    addMainCards(pagesData[`${pageStatus.category}`][0], pagesData[`${pageStatus.category}`][1], pageStatus.pageMode, pagesData[`${pageStatus.category}`][2]);
    activeLink();
  }
});

mainImages.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('main-card')) {
    changeCategory(event.target.textContent);
  }
  if (event.target.parentElement.classList.contains('main-card')) {
    changeCategory(event.target.parentElement.textContent);
  }
});


export const firstPage = () => {
  if (!checkActivePage()) {
    pageStatus.category = 'Main Page';
    pageStatus.pageMode = 'train';
    saveState();
  }
};
