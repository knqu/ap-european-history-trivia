// preloader selectors
const preloader = document.querySelector('#preloader');
const subPreloaderText = document.querySelector('#subPreloaderText');
const content = document.querySelector('#content');
const startScreen = document.querySelector('#startScreen');

// game ui selectors
const startBtn = document.querySelector('#startBtn');
const gameScreen = document.querySelector('#gameScreen');

// intro selectors
const intro = document.querySelector('#intro');
const introText = document.querySelectorAll('.intro');
const startTimer = document.querySelector('#startTimer');

// question selectors
const q1 = document.querySelector('#q1');
const q1Text = document.querySelectorAll('.q1');

// preloader & page animations

window.onload = function () {
    subPreloaderText.style.display = 'none';
    const timeline = gsap.timeline();
    timeline
        .to(preloader, { duration: 2, opacity: 0 })
        .to(content, { duration: 2, opacity: 1 })
        .from(startScreen, { duration: 3, y: -50, ease: 'elastic' }, 2);
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

function setTimer(seconds, el, callback) {
    let timeLeft = seconds;
    let timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (callback === 'questionOne') {
                questionOne();
            }
        } else {
            el.innerHTML = timeLeft;
        }
        timeLeft--;
    }, 1000);
}

startBtn.addEventListener('click', function () {
    const timeline = gsap.timeline();
    timeline
        .to(startScreen, { duration: 1, opacity: 0 })
        .to(gameScreen, { duration: 1, opacity: 1 });
    setTimeout(function () {
        startScreen.remove();
    }, 1000);
    timeline
        .to(introText[0], { duration: 1, opacity: 1 }, '<')
        .to(introText[1], { duration: 2, opacity: 1 })
        .to(introText[2], { duration: 2, opacity: 1 })
        .to(introText[3], { duration: 2, opacity: 1 })
        .to(introText[4], { duration: 2, opacity: 1 });
    setTimeout(function () {
        setTimer(3, startTimer, 'questionOne');
    }, 7000);
});

function questionOne() {
    const timeline = gsap.timeline();
    timeline
        .to(intro, { duration: 1, opacity: 0 })
        .to(q1, { duration: 1, opacity: 1 });
}
