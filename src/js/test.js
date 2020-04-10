
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

const pagesData = {
    'categories': ['Main Page','Action (set A)','Action (set B)','Action (set C)','Adjective','Animal (set A)','Animal (set B)','Clothes','Emotion'],
    'Main Page': [['dance.jpg','open.jpg','play.jpg','open.jpg','bird.jpg','chicken.jpg','blouse.jpg','happy.jpg'],
                ['Action (set A)','Action (set B)','Action (set C)','Adjective','Animal (set A)','Animal (set B)','Clothes','Emotion']],
    'Action (set A)': [['cry.jpg','dance.jpg','dive.jpg','draw.jpg','sit.jpg','jump.jpg','laugh.jpg', 'fly.jpg'],
    ['cry','dance','dive','draw','sit','jump','laugh', 'fly']],
    'Action (set B)': [['open.jpg', 'point.jpg', 'skip.jpg', 'smile.jpg', 'ride.jpg','swim.jpg','sing.jpg','eat.jpg'],
                      ['open', 'point', 'skip', 'smile', 'ride','swim','sing','eat']],
    'Action (set C)': [['play.jpg','build.jpg','break.jpg','hit.jpg','cut.jpg','walk.jpg','read.jpg','hug.jpg'],
                        ['play','build','break','hit','cut','walk','read','hug']],
    'Adjective': [['cold.jpg','dirty.jpg','big.jpg','little.jpg','long.jpg','sweet.jpg','hot.jpg','funny.jpg'],
                    ['cold','dirty','big','little','long','sweet','hot','funny']],
    'Animal (set A)': [['bird.jpg','cat.jpg','chick.jpg','dog.jpg','dolphin.jpg','fish.jpg','frog.jpg','giraffe.jpg'],
                    ['bird','cat','chick','dog','dolphin','fish','frog','giraffe']],   
    'Animal (set B)': [['chicken.jpg','horse.jpg','lion.jpg','mouse.jpg','pig.jpg','rabbit.jpg','sheep.jpg','turtle.jpg'],
                    ['chicken','horse','lion','mouse','pig','rabbit','sheep','turtle']],   
    'Clothes': [['blouse.jpg','boot.jpg','coat.jpg','dress.jpg','shirt.jpg','shoe.jpg','skirt.jpg','pants.jpg'],
                    ['blouse','boot','coat','dress','shirt','shoe','skirt','pants']],
    'Emotion': [['angry.jpg','happy.jpg','sad.jpg','scared.jpg','tired.jpg','surprised.jpg','regret.jpg','shy.jpg'],
                    ['angry','happy','sad','scared','tired','surprised','regret','shy']],                                                                                      
}

const mainImages = document.getElementById('main-images');
const navigation = document.getElementById('navigation');
const navigationLinks = navigation.querySelectorAll('a');
//script for switcher
const switcher = document.getElementById('myonoffswitch');
//const allLinks = document.querySelectorAll('a');

const checkStatusSwitcer = () => {
    
    if (pageStatus.pageMode === 'train'){
        switcher.checked = true;
    }
    else {
        switcher.checked = false;
    }
}

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

const checkActivePage = () =>{
    if (window.location.href.includes('train') || window.location.href.includes('play')){
        return true;
    }
    else{
        return false;
    }
}

const changePageMode = (mode) =>{
    if (checkActivePage()){
        if(window.location.href.includes('train')){
            window.location.href = 'play.html'
        }
        else{
            window.location.href = 'train.html'
        }
    }
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


const createCardText = (card, textForCard) => {
    let text = document.createElement('p');
    card.append(text);
    text.textContent = textForCard;
}

const createCardImage = (element, card) =>{
    let image = document.createElement('img');
    image.src = `/src/assets/img/${element}`
    card.append(image)
} 

const createMainCard = (element, textForCard, mode) => {
        
        if (checkActivePage()){
            console.log('я только начал', mode)
            let wordCard = document.createElement('div')
            wordCard.className = `${mode}-card`;
            mainImages.append(wordCard);
            createCardImage(element, wordCard);
            createCardText(wordCard, textForCard);
        }
        else{
            let card = document.createElement('a');
            card.className = 'main-card';
            card.classList.add(`main-card_${pageStatus.pageMode}`);
            card.href = `${pageStatus.pageMode}.html`;
            mainImages.append(card);
            createCardImage(element, card);
            createCardText(card, textForCard);
        }    
}

const deleteCards = () =>{
    while (mainImages.hasChildNodes()) {
        mainImages.removeChild(mainImages.firstChild);
      } 
}

const addMainCards = (array, textForCardArr, mode) =>{
        if (mainImages.childNodes.length>0){
            deleteCards();
        }
    let index = 0 
    array.forEach(element => {
        let textForCard = textForCardArr[index];
        createMainCard(element, textForCard, mode);
        index +=1;
    });
}



//change categori
navigation.addEventListener('click', (event) =>{
    if(event.target.classList.contains('navigation__link')){
        changeCategori(event.target.textContent);
        navigation.classList.remove('navigation-active');
        hamburger.classList.remove('active');
    }
    addMainCards(pagesData[`${pageStatus.categori}`][0], pagesData[`${pageStatus.categori}`][1], pageStatus.pageMode);
});

mainImages.addEventListener('mousedown', (event) =>{
    if(event.target.classList.contains('main-card')){
        changeCategori(event.target.textContent)
    }
    if(event.target.parentElement.classList.contains('main-card')){
        changeCategori(event.target.parentElement.textContent)
    }
})
const changeCategori = (str) =>{
    console.log(str)
    pageStatus.categori = str;
    saveState();
}

const firstPage = () =>{
    if (!checkActivePage()){
        pageStatus.categori  = 'Main Page';
        pageStatus.pageMode = 'train';
        saveState();
    }
} 



window.onload = () => {
    firstPage(); 
    restoreState();
    checkStatusSwitcer();
    addMainCards(pagesData[`${pageStatus.categori}`][0], pagesData[`${pageStatus.categori}`][1], pageStatus.pageMode);
    navigationChangeBackground();  
  };