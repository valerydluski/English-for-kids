let pageStatus = {
    pageMode: 'train',
    categori: 'Main Page',
}
const imagesMainPage = ['fish.jpg','open.jpg','fly.jpg','open.jpg','chicken.jpg','bird.jpg','blouse.jpg','smile.jpg'];
const categories = ['Main Page','Action (set A)','Action (set B)','Action (set C)','Adjective','Animal (set A)','Animal (set B)','Clothes','Emotion']
const mainImages = document.getElementById('main-images');
const navigation = document.getElementById('navigation');
//script for switcher
const switcher = document.getElementById('myonoffswitch');

const navigationChangeBackground = () =>{
    let NavigationClassList =  navigation.classList;
    if (NavigationClassList.contains('navigation_train')){
        NavigationClassList.add('navigation_play');
        NavigationClassList.remove('navigation_train');
    }
    else{
        NavigationClassList.remove('navigation_play');
        NavigationClassList.add('navigation_train');
    }
};

const changeCardsBackground = (element) =>{
    console.log(element.classList, pageStatus.pageMode);

    if (pageStatus.pageMode === 'train'){
        element.classList.remove('main-card_train');
        element.classList.add('main-card_play');
    }
    else{
        element.classList.remove('main-card_play');
        element.classList.add('main-card_train');
    }
   
}
const changePageMode = (mode) =>{
    if(mode){
        pageStatus.pageMode = 'train'; 
    }
    else{
        pageStatus.pageMode = 'play';
    }
}

const modeSwitch = (mode) =>{
    navigationChangeBackground();
    let cards = mainImages.querySelectorAll('.main-card');
    cards.forEach(element => {
        changeCardsBackground(element)
    });
   changePageMode(mode);   
}
switcher.addEventListener('click', () =>{
    modeSwitch(event.target.checked)
}) 
//create card for main-page


const createCardText = (card, index) => {
    let text = document.createElement('p');
    card.append(text);
    text.textContent = `${categories[index]}`;
}

const createCard = (element, typeCard, index) => {
        let card = document.createElement('a');
        card.className = 'main-card';
        card.classList.add('main-card_train');
        mainImages.append(card);
        createCardImage(element, card);
        createCardText(card, index);
}

const createCardImage = (element, card) =>{
        let image = document.createElement('img');
        image.src = `/src/assets/img/${element}`
        card.append(image)
} 

const addCards = (array, typeCard, mode) =>{
    let index = 1;
    array.forEach(element => {
        createCard(element, typeCard, index, mode);
        index +=1;  
    });
}

window.onload = () => {
    addCards(imagesMainPage);
  };