// sript for hamburger
const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');
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
  if (target !== navigation && target.parentNode !== navigation
  && target !== hamburger && target.parentNode !== hamburger) {
    switcherNavigation();
    window.removeEventListener('mousedown', windowListener);
  }
};


const closeNavigation = () => {
  window.addEventListener('mousedown', windowListener);
};


hamburger.addEventListener('mousedown', () => {
  switcherNavigation();
  closeNavigation();
});
