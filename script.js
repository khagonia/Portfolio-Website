class scrollingAnimation {

  animate(target, animation, delay=1000) {
    const targetElement = document.querySelector(target)

    const revealCallback = (entries, observer) => {
      const [entry] = entries;
      console.log(entry);
  
      if(!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target);
      }, delay)
      
    }

    const scrollingObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.5,
    });

    targetElement.classList.add(animation, 'hidden');
    scrollingObserver.observe(targetElement);
  }
}

const scrollAnim = new scrollingAnimation();
// scrollAnim.animate('.hero-content-area', 'fade-in',1000)

// const anim = new scrollingAnimation();
// anim.animate('.cta-section__1', 'fade-in');
// anim.animate('.cta-image', 'fade-in');
// anim.animate('.cta-section__2', 'fade-in', 2000);

const themeSelectors = document.querySelectorAll('.squares')
let currentTheme = '';

themeSelectors.forEach( selector => {
  addEventListener('click', (event) => {
    changeTheme(event);
  });
})

const changeTheme = (event) => {
  if(!event.target.classList.contains('square')) return;
    if(event.target.dataset.theme === currentTheme) return;
  
    themeContainer = document.querySelector('.themes-container');
    currentTheme && themeContainer.classList.remove(`show-${currentTheme}`);
    currentTheme = event.target.dataset.theme;
    console.log(currentTheme)
  
    themeContainer.classList.add(`show-${currentTheme}`);
}




