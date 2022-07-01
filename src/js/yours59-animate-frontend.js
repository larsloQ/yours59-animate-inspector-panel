/* sorry no build process for this */


function scrollTrigger(selector){
	let els = document.querySelectorAll(selector)
	els = Array.from(els)
	els.forEach(el => {
		addObserver(el)
	})
}

/**
 * extract animation class from classlist.
 * supposing that animation class always comes directly after class 
 * 'animate-always-in-view' in classlist
 *
 * @param      {<type>}  classes  element.classList (Nodelist)
 * @return     {string}  classname of animation class
 */
function yours59_find_animation_name_from_classlist(classes) {
	let animationClass = '';
	try {
		classes.forEach((c,i)=>{
			if(c==='yours59-animate-me') {
				animationClass = classes[i+1];
				return ;
			}
		})
	} catch(error) {
		console.error(error)
	}
	return animationClass;
}

function addObserver(el){
	let observer = new IntersectionObserver((entries, observer) => { 
		entries.forEach(entry => {
				// `entry.isIntersecting` will be true if the element is visible
				if(entry.isIntersecting) {
					entry.target.classList.add('animate-in-view--run');
					/* get the repetitions */
					let repetitions = entry.target.style['animation-iteration-count'] ? entry.target.style['animation-iteration-count'] : 1;
					if(entry.target.getAttribute('data-opacity-before')) {
						entry.target.style.opacity = entry.target.getAttribute('data-opacity-before');
					}
					if(repetitions !== 'infinite') {
						/* animation end listener */
						entry.target.addEventListener('animationend', (ev) => {
							ev.target.classList.add('animate-in-view--ended');
							ev.target.style['animation-name']='none'
							if(ev.target.getAttribute('data-opacity-after')) {
								ev.target.style.opacity = ev.target.getAttribute('data-opacity-after');
							}
							if(ev.target.classList.contains('animate-always-in-view')) {
								ev.target.classList.remove('animate-in-view--ended');
								ev.target.classList.remove('animate-in-view--run');

								setTimeout(function(){
									const reset_animation_name = yours59_find_animation_name_from_classlist(ev.target.classList);
									if(reset_animation_name) {
										ev.target.style['animation-name']= reset_animation_name;
									}
								},50);
							}
						});
					}
					if(false === entry.target.classList.contains('animate-always-in-view')) {
					// We are removing the observer from elements with NOT animate-always-in-view
					observer.unobserve(entry.target)
				}
			}
		})
	})
		observer.observe(el)
	}
scrollTrigger('.animate-in-view')