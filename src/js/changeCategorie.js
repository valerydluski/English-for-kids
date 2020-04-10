import {pageStatus, saveState, addMainCards, pagesData} from './test';
//change categori
const mainImages = document.getElementById('main-images');

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
    saveState;
}

export const firstPage = () =>{
    if (!checkActivePage()){
        pageStatus.categori  = 'Main Page';
        pageStatus.pageMode = 'train';
        saveState;
    }
} 

