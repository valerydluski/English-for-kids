import {
  pageStatus, pagesData, mainImages, navigation,
} from './constants';
import {
  saveState, restoreState, addMainCards, activeLink,
} from './main';

// change category
const changeCategory = (str) => {
  restoreState();
  pageStatus.category = str;
  saveState();
};

navigation.addEventListener('mousedown', (event) => {
  const classes = event.target.classList;
  if (pageStatus.pageMode !== 'play') {
    if (classes.contains('navigation__link')) {
      changeCategory(event.target.textContent);
      if (window.location.href !== event.target.href) {
        window.location.href = event.target.href;
      }
      const { category } = pageStatus;
      addMainCards(pagesData[`${category}`][0], pagesData[`${category}`][1], pageStatus.pageMode, pagesData[`${category}`][2]);
      activeLink();
    }
  }
});

mainImages.addEventListener('mousedown', (event) => {
  const classes = event.target.classList;
  if (classes.contains('main-card')) {
    changeCategory(event.target.textContent);
  }
  if (event.target.parentElement.classList.contains('main-card')) {
    changeCategory(event.target.parentElement.textContent);
  }
});
