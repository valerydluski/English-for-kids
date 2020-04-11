//sript for hamburger
window.addEventListener('mousedown', function(event){
	    if(event.target != navigation && event.target.parentNode != navigation && event.target != hamburger && event.target.parentNode != hamburger){
            hamburger.classList.remove('active');
            hamburger.classList.add('not-active');
            navigation.classList.remove('navigation-active');
	    }
	});

export const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('mousedown', () => {
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


