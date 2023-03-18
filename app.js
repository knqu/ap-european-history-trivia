// preloader selectors
const content = document.querySelector('#content');
const startScreen = document.querySelector('#startScreen');

// game ui selectors
const startBtn = document.querySelector('#startBtn');
const gameScreen = document.querySelector('#gameScreen');
const responseModal = new bootstrap.Modal(document.querySelector('#responseModal'));
const responseModalTitle = document.querySelector('.modal-title');
const responseModalText = document.querySelector('.modal-body');

// question (/intro) selectors
const intro = document.querySelector('#intro');
const introText = document.querySelectorAll('.intro');
const startTimer = document.querySelector('#startTimer');
const options = document.querySelectorAll('.options');
const optionBtns = document.querySelectorAll('.option');
const correct = document.querySelectorAll('.correct');
const scenes = document.querySelectorAll('.scene');

// score selectors
let points = 0;
const score = document.querySelector('#score');
const scoreText = document.querySelectorAll('.score');
const scoreVal = document.querySelector('#scoreVal');

// preloader & page animations

window.onload = function () {
    gsap.from(startScreen, { duration: 3, y: -50, ease: 'elastic' });
};

// trivia game

let timer;
function setTimer(seconds, el, callback, previousElement) {
    let timeLeft = seconds;
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (previousElement !== intro && callback < 12) {
                responseModal.show();
                responseModalTitle.innerHTML = "Time's up!";
                responseModalTitle.classList.remove('success');
                responseModalTitle.classList.add('error');
                responseModalText.innerHTML = `You still have ${points} points!`;
            }
            if (callback < 12) {
                new Question(previousElement).start();
            } else {
                summary();
            }
        } else {
            if (el) {
                el.innerHTML = timeLeft;
            }
        }
        timeLeft--;
        console.log(timer);
        console.log(seconds, el, callback, previousElement);
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
        .to(introText[0], { duration: 2, opacity: 1 }, '<')
        .to(introText[1], { duration: 2, opacity: 1 })
        .to(introText[2], { duration: 2, opacity: 1 })
        .to(introText[3], { duration: 2, opacity: 1 });
    setTimeout(function () {
        setTimer(3, startTimer, 1, intro);
    }, 6000);
});

function summary() {
    scoreVal.innerHTML = `${points} out of 11`;
    const timeline = gsap.timeline();
    timeline
        .to(scenes[10], { duration: 1, opacity: 0 })
        .to(score, { duration: 1, opacity: 1 });
    setTimeout(function () {
        scenes[10].remove();
    }, 1000);
    timeline
        .to(scoreText[0], { duration: 2, opacity: 1 }, '<')
        .to(scoreText[1], { duration: 2, opacity: 1 })
        .to(scoreText[2], { duration: 2, opacity: 1 });
}

class Question {
    constructor(previousElement) {
        this.previousElement = previousElement;
        this.element = this.previousElement.nextElementSibling;
        if (previousElement === intro) {
            this.question = 'q1';
        } else {
            let currentQuestion = parseInt(this.previousElement.id.substring(1));
            this.question = `q${currentQuestion += 1}`;
        }
        this.children = this.element.children;
    }

    start() {
        const previousElement = this.previousElement;
        const element = this.element;
        const question = this.question;
        const children = this.children;

        optionBtns.forEach(function (option) {
            if (option.parentElement.classList.contains(question)) {
                option.addEventListener('click', function () {
                    if (option.classList.contains('correct')) {
                        points++;
                        responseModal.show();
                        responseModalTitle.innerHTML = "Correct!";
                        responseModalTitle.classList.remove('error');
                        responseModalTitle.classList.add('success');
                        responseModalText.innerHTML = `You now have ${points} points!`;
                    } else {
                        responseModal.show();
                        responseModalTitle.innerHTML = "Incorrect!";
                        responseModalTitle.classList.remove('success');
                        responseModalTitle.classList.add('error');
                        responseModalText.innerHTML = `You still have ${points} points!`;
                    }
                    clearInterval(timer);
                    new Question(element).start();
                }
                );
            }
        });

        const timeline = gsap.timeline();
        timeline
            .to(this.previousElement, { duration: 1, opacity: 0 })
            .to(this.element, { duration: 1, opacity: 1 });
        setTimeout(function () {
            previousElement.remove();
        }, 1000);
        timeline
            .to(this.children[0], { duration: 2, opacity: 1 }, '<')
            .to(this.children[1], { duration: 2, opacity: 1 })
            .to(this.children[2], { duration: 2, opacity: 1 })
            .to(this.children[3], { duration: 2, opacity: 1 });
        let n = parseInt(question.substring(1));
        setTimeout(function () {
            setTimer(10, children[3], n += 1, element);
        }, 6000);
    }
}
