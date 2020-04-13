// reverse card
const hideTranslate = (child) => {
  child[1].classList.add('text-hidden');
  child[0].classList.remove('text-hidden');
  child[2].classList.remove('button_hidden');
};

const reverseCardBeginState = () => {
  const card = event.currentTarget;
  card.classList.add('run-animation');
  function deleteAnimation() {
    card.classList.remove('run-animation');
  }
  setTimeout(deleteAnimation, 1000);
  hideTranslate(card.childNodes[1].childNodes);
  card.removeEventListener('mouseleave', reverseCardBeginState);
};


const changeText = (child) => {
  child[0].classList.add('text-hidden');
  child[1].classList.remove('text-hidden');
};

const reverseCard = (card) => {
  card.classList.add('run-animation');
  changeText(card.childNodes[1].childNodes);
  function createMouseleave() {
    card.classList.remove('run-animation');
    card.addEventListener('mouseleave', reverseCardBeginState);
  }
 setTimeout(createMouseleave, 1000);
};
  // play audio for train
const playAudioForTrain = (str) => {
  const audioTrain = new Audio();
  audioTrain.src = `https://wooordhunt.ru//data/sound/word/us/mp3/${str}.mp3`;
  audioTrain.autoplay = true;
};

const trainCounter = (target) => {
  console.log(target, target.parentNode);
}

export const listenerForCards = (card) => {
  card.addEventListener('click', (event) => {
    // trainCounter(event.currentTarget);
    const str = event.currentTarget.childNodes[0].id;
    playAudioForTrain(str);
    if (event.target.classList.contains('button_reverse')) {
      reverseCard(event.currentTarget);
      event.target.classList.add('button_hidden');
    }
  });
};
