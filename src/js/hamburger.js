// sript for hamburger
import { navigation } from './main';

const hamburger = document.getElementById('hamburger');
export { hamburger as default };
window.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target !== navigation && target.parentNode !== navigation
    && target !== hamburger && target.parentNode !== hamburger) {
    hamburger.classList.remove('active');
    hamburger.classList.add('not-active');
    navigation.classList.remove('navigation-active');
  }
});


hamburger.addEventListener('mousedown', () => {
  if (hamburger.classList[1] === 'active') {
    hamburger.classList.remove('active');
    hamburger.classList.add('not-active');
    navigation.classList.remove('navigation-active');
  } else {
    hamburger.classList.remove('not-active');
    hamburger.classList.add('active');
    navigation.classList.add('navigation-active');
  }
});
