let pageStatus = {
    pageMode: 'train',
    categori: 'Main Page',
}

const saveState = () => {
    localStorage.setItem('pageMode', pageStatus.pageMode);
    localStorage.setItem('categori', pageStatus.categori);
  };
  
  const restoreState = () => {
    pageStatus.pageMode = (localStorage.getItem('pageMode')) ? localStorage.getItem('pageMode') : pageStatus.pageMode;
    pageStatus.categori =  (localStorage.getItem('categori')) ? localStorage.getItem('categori') : pageStatus.categori;
  };


const imagesMainPage = ['fish.jpg','open.jpg','fly.jpg','open.jpg','chicken.jpg','bird.jpg','blouse.jpg','smile.jpg'];
const categories = ['Main Page','Action (set A)','Action (set B)','Action (set C)','Adjective','Animal (set A)','Animal (set B)','Clothes','Emotion']
const mainImages = document.getElementById('main-images');
const navigation = document.getElementById('navigation');

//script for switcher
const switcher = document.getElementById('myonoffswitch');

const navigationChangeBackground = () =>{
    let NavigationClassList =  navigation.classList;
    if (pageStatus.pageMode==='play'){
        NavigationClassList.add('navigation_play');
        NavigationClassList.remove('navigation_train');
    }
    else{
        NavigationClassList.remove('navigation_play');
        NavigationClassList.add('navigation_train');
    }
};

const changeCardsBackground = (element) =>{

    if (pageStatus.pageMode === 'play'){
        element.classList.remove('main-card_train');
        element.classList.add('main-card_play');
    }
    else{
        element.classList.remove('main-card_play');
        element.classList.add('main-card_train');
    }
   
}

const changeLinks = (str) =>{
    let navigationLinks = navigation.querySelectorAll('a');
    let mainImagesLinks = mainImages.querySelectorAll('a');
    navigationLinks.forEach(element => {
        if (!(element.href.includes('index'))){
            element.href =`${str}.html`;
        }
    }); 
    mainImagesLinks.forEach(element => {
        element.href =`${str}.html`;
    }); 
}

const changePageMode = (mode) =>{
    if(mode){
        pageStatus.pageMode = 'train';
        saveState();
        changeLinks('train'); 

    }
    else{
        pageStatus.pageMode = 'play';
        saveState();
        changeLinks('play'); 
    }
}

const modeSwitch = (mode) =>{
    changePageMode(mode);  
    console.log(switcher.checked)
    navigationChangeBackground();
    let cards = mainImages.querySelectorAll('.main-card');
    cards.forEach(element => {
        changeCardsBackground(element)
    });
   changePageMode(mode);   
}
switcher.addEventListener('click', () =>{
    modeSwitch(event.target.checked); 
}) 
//create card for main-page


const createCardText = (card, index) => {
    let text = document.createElement('p');
    card.append(text);
    text.textContent = `${categories[index]}`;
}

const createCardImage = (element, card) =>{
    let image = document.createElement('img');
    image.src = `/src/assets/img/${element}`
    card.append(image)
} 

const createMainCard = (element, typeCard, index) => {
        let card = document.createElement('a');
        card.className = 'main-card';
        card.classList.add('main-card_train');
        card.href = `${pageStatus.pageMode}.html`;
        mainImages.append(card);
        createCardImage(element, card);
        createCardText(card, index);
}

const addMainCards = (array, typeCard, mode) =>{
    let index = 1;
    array.forEach(element => {
        createMainCard(element, typeCard, index, mode);
        index +=1;  
    });
}

const checkStatusSwitcer = () => {
    console.log(switcher.checked);
    if (pageStatus.pageMode === 'train'){
        switcher.checked = true;
    }
    else {
        switcher.checked = false;
    }
}

window.onload = () => {
    restoreState();  
    checkStatusSwitcer();
    addMainCards(imagesMainPage);
    navigationChangeBackground();
  };