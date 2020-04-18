import { navigation } from './constants';

// sript for hamburger
const hamburger = document.getElementById('hamburger');
const classesHamburger = hamburger.classList;
const classesNavigation = navigation.classList;

const switcherNavigation = () => {
  classesHamburger.toggle('active');
  classesHamburger.toggle('not-active');
  classesNavigation.toggle('navigation-active');
};

export default switcherNavigation;

const windowListener = (event) => {
  const { target } = event;
  if (target.classList.contains('navigation__img')) {
    window.removeEventListener('mousedown', windowListener);
    return;
  }
  if (!(classesNavigation.contains('navigation-active'))) {
    window.removeEventListener('mousedown', windowListener);
  }
  if (target !== navigation && target.parentNode !== navigation
  && target !== hamburger && target.parentNode !== hamburger) {
    window.removeEventListener('mousedown', windowListener);
    switcherNavigation();
  }
};


const closeNavigation = () => {
  window.addEventListener('mousedown', windowListener);
};


hamburger.addEventListener('mousedown', () => {
  switcherNavigation();
  closeNavigation();
});
