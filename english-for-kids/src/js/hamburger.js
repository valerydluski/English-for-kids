// sript for hamburger

export const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');

export const deactivateNavigation = () => {
  hamburger.classList.remove('active');
  hamburger.classList.add('not-active');
  navigation.classList.remove('navigation-active');
};

window.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target.classList.contains('navigation__img')) {
    return;
  }
  if (target !== navigation && target.parentNode !== navigation
    && target !== hamburger && target.parentNode !== hamburger) {
    deactivateNavigation();
  }
});


hamburger.addEventListener('mousedown', () => {
  if (hamburger.classList[1] === 'active') {
    deactivateNavigation();
  } else {
    hamburger.classList.remove('not-active');
    hamburger.classList.add('active');
    navigation.classList.add('navigation-active');
  }
});
