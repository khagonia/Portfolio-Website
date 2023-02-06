/****************************/
/* Scrolling Animations     */ 
/****************************/

class scrollingAnimation {
  animate(target, animation = 'fade-in', delay = 1000) {
    const targetElement = document.querySelector(target);

    const revealCallback = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.classList.remove("hidden");
        observer.unobserve(entry.target);
      }, delay);
    };

    const scrollingObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.3,
    });

    targetElement.classList.add(animation, "hidden");
    scrollingObserver.observe(targetElement);
  }
}

const scrollAnim = new scrollingAnimation();
scrollAnim.animate('.profile-section', 'fade-in' , 400)
scrollAnim.animate('.work-section', 'fade-in' , 400)
scrollAnim.animate('.projects-section', 'fade-in' , 400)


/****************************/
/* Theme Switch             */ 
/****************************/

const themeSelectors = document.querySelectorAll(".squares");
let currentTheme = "";

themeSelectors.forEach((selector) => {
  addEventListener("click", (event) => {
    changeTheme(event);
  });
});

const changeTheme = (event) => {
  if (!event.target.classList.contains("square")) return;
  if (event.target.dataset.theme === currentTheme) return;

  themeContainer = document.querySelector(".themes-container");
  currentTheme && themeContainer.classList.remove(`show-${currentTheme}`);
  currentTheme = event.target.dataset.theme;

  themeContainer.classList.add(`show-${currentTheme}`);
};


/****************************/
/* Loading Sequence         */ 
/****************************/
window.addEventListener("load", async () => {
  preLoadingSequence();
});

const preLoadingSequence = () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.querySelector('img').classList.add("easeinback");
  }, 1000);
  setTimeout(() => {
    preloader.classList.add("preloader__stop");
    showHeroAnimations();
  }, 1600);
}

const showHeroAnimations = () => {
  document.querySelector('.hero-heading__text1').classList.add('type')
  document.querySelector('.hero-heading__text2').classList.add('type')
  document.querySelector('.hero-heading__text3').classList.add('type')
  setTimeout(() => {
    document.querySelector('.hero-cta').classList.remove('hidden')
  }, 6800)
}

/****************************/
/* Cursor                   */ 
/****************************/

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.setAttribute('style', `top:${e.pageY}px;left:${e.pageX}px`)
})

document.addEventListener('click', () => {
  cursor.classList.add('click');
  setTimeout(() => {cursor.classList.remove('click')}, 150)
})

/****************************/
/* Job Experience Tabs      */ 
/****************************/

const work = document.querySelector('.work-timeline')

work.addEventListener('click', (event) => {
  if(!event.target.classList.contains('work-list-element')) return;
  if(event.target.dataset.id === document.querySelector('.work-details.active').id) return;

  [...work.children].forEach( workList => workList.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.work-details').forEach( workDetail => {
    workDetail.classList.remove('active')
  })

  setTimeout( () => {
    document.querySelector(`#${event.target.dataset.id}`).classList.add('active')
  }, 500)
});

/*********************************/
/* Frontend Mentor Carousel      */ 
/*********************************/
let position = 1;
setInterval(() => {
  document.querySelectorAll('.project-image__img').forEach( image => image.classList.remove('active'));
  document.querySelector(`.project-image__img[data-position="${position}"]`).classList.add('active');
  position = position >= 3 ? 1 : position + 1 ;
}, 12000)

/****************************/
/* Navbar Change Active     */ 
/****************************/

const highlightCallback = (entries) => {
  const [entry] = entries

  if(!entry.isIntersecting) return;


  const navLogo = document.querySelector('.nav-logo-link');
  navLogo.classList.remove('active');
  if(navLogo.dataset.section === entry.target.id) {
    navLogo.classList.add('active');
  }

  document.querySelectorAll('.nav-links li a').forEach( link => {
    link.classList.remove('active');
    if(!(link.dataset.section === entry.target.id)) return;
    link.classList.add('active');
  })

  const socialIcons = document.querySelector('.social-icons');
  socialIcons.classList.remove('active')
  if(socialIcons.dataset.section === entry.target.id) {
    socialIcons.classList.add('active');
  }

}

const navObserver = new IntersectionObserver(highlightCallback, {
  root: null,
  threshold: 0.5
})

navObserver.observe(document.querySelector('.hero-section'));
navObserver.observe(document.querySelector('.profile-section'));
navObserver.observe(document.querySelector('.work-section'));
navObserver.observe(document.querySelector('.projects-section'));
navObserver.observe(document.querySelector('.blog-section'));
navObserver.observe(document.querySelector('.cta-section'));