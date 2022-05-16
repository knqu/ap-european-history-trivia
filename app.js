// preloader selectors
const preloader = document.querySelector('#preloader');
const subPreloaderText = document.querySelector('#subPreloaderText');
const content = document.querySelector('#content');
const h1 = document.querySelector('h1');

// game ui selectors
const start = document.querySelector('#start');

// preloader & page animations

window.onload = function () {
    subPreloaderText.style.display = 'none';
    const timeline = gsap.timeline();
    timeline
        .to(preloader, { duration: 2, opacity: 0 })
        .to(content, { duration: 2, opacity: 1 })
        .from(h1, { duration: 3, y: -50, ease: 'elastic' }, 2);
    setTimeout(function () {
        preloader.remove();
        subPreloaderText.remove();
    }, 2000);
};

setTimeout(function () {
    if (content.style.opacity == 0) {
        subPreloaderText.innerText = 'Please check your connection and that your antivirus is not blocking cdn.cloudflare.com';
    }
}, 4000);

// trivia game

start.addEventListener('click', function () {
    console.log('click');
});
