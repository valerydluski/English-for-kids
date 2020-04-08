const imagesMainPage = ['fish.jpg','open.jpg','fly.jpg','open.jpg','chicken.jpg','bird.jpg','blouse.jpg','smile.jpg'];
const categories = ['Main Page','Action (set A)','Action (set B)','Action (set C)','Adjective','Animal (set A)','Animal (set B)','Clothes','Emotion']
const mainImages = document.getElementById('main-images');

const createCardText = (card, index) => {
    let text = document.createElement('p');
    card.append(text);
    text.textContent = `${categories[index]}`;
}

const createCard = (element, typeCard, index) => {
        let card = document.createElement('a');
        card.className = 'main-card';
        mainImages.append(card);
        createCardImage(element, card);
        createCardText(card, index);
}

const createCardImage = (element, card) =>{
        let image = document.createElement('img');
        image.src = `../assets/img/${element}`
        card.append(image)
} 

const addCards = (array, typeCard) =>{
    let index = 1;
    array.forEach(element => {
        createCard(element, typeCard, index);
        index +=1;  
    });
}
console.log('hello');
//sript for hamburger
const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation')
hamburger.addEventListener('click', () => {
	{
		if (hamburger.classList[1] == 'active') {
         hamburger.classList.remove('active');
         hamburger.classList.add('not-active');
         navigation.classList.remove('navigation-active');
		}
		else{
         hamburger.classList.remove('not-active');
         hamburger.classList.add('active');
         navigation.classList.add('navigation-active');
		}	
	}	
})

window.onload = () => {
    addCards(imagesMainPage);
  };