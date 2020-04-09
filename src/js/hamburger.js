//sript for hamburger
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
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
})

