import flagsList from '../data/flags.json';

const startQuizBtn = document.querySelector('.intro-section__btn');
const quizInterface = document.querySelector('.quiz-interface');
const startQuizPanel = document.querySelector('.intro-section');
const labelAnswersList = document.querySelectorAll('.answers-list__label');
const inputAnswerElements = [...document.querySelectorAll('.answers-list__input')];
const imgFlagElement = document.querySelector('.quiz-interface__flag-img');
const nextQuestionBtn = document.querySelector('.quiz-interface__give-answer-btn');
const incorrectAnswerNotyfication = document.querySelector('.quiz-interface__error');
const currentQuestionElement = document.querySelector('.quiz-interface__question-number > output');
const quizStatisticsDashboard = document.querySelector('.finished-quiz-result');
const quizStatisticsCorrectAnswers = document.querySelector('.quiz-statistics__output_correct');
const quizStatisticsBadAnswers = document.querySelector('.quiz-statistics__output_badly');
let currentFlagName;
let correctAnswersCounter = 0;
let badAnswersCounter = 0;
let currentQuestionNumber = 1;

const getOneCorrectCountryName = () => {
    const flagNameFromLabelElement = labelAnswersList[Math.trunc(Math.random() * 4)];
    imgFlagElement.src = `https://countryflagsapi.com/svg/${flagNameFromLabelElement.textContent}`;
    currentFlagName = flagNameFromLabelElement.textContent;
};

const getRandomCountryNames = () => {
    const flagsListLength = Object.keys(flagsList).length;
    labelAnswersList.forEach((el) => {
        el.textContent = flagsList[Math.trunc(Math.random() * flagsListLength) + 1];
    });
    setTimeout(() => {
        quizInterface.classList.remove('active')
    }, 1000)
};

const checkIfAnswerIsCorrect = () => {
    quizInterface.classList.add('active');
    inputAnswerElements.forEach((el) => {
        if (el.checked) {
            const nextSiblingLabelElement = el.nextElementSibling;
            if (nextSiblingLabelElement.textContent === currentFlagName) {
                correctAnswersCounter++;
                console.log(correctAnswersCounter);
            } else if (nextSiblingLabelElement.textContent !== currentFlagName) {
                badAnswersCounter++;
                console.log(badAnswersCounter);
            }
        }
        el.checked = false;
    });
};

const handleFinalPlayerScores = () => {
    imgFlagElement.src = '#';
    quizInterface.classList.remove('active');
    quizStatisticsDashboard.classList.add('active');
    quizStatisticsCorrectAnswers.textContent = correctAnswersCounter;
    quizStatisticsBadAnswers.textContent = badAnswersCounter;
};

nextQuestionBtn.addEventListener('click', () => {
    const isAnyAnswerChecked = inputAnswerElements.some((el) => el.checked);
    const isTheLastQuestion = currentQuestionNumber === 15;
    if (isAnyAnswerChecked && !isTheLastQuestion) {
        incorrectAnswerNotyfication.textContent = '';
        incorrectAnswerNotyfication.classList.remove('active');
        currentQuestionNumber++;
        currentQuestionElement.textContent = currentQuestionNumber;
        checkIfAnswerIsCorrect();
        getRandomCountryNames()
        getOneCorrectCountryName()
    } else if (isTheLastQuestion) {
        handleFinalPlayerScores();
    } else {
        incorrectAnswerNotyfication.textContent = 'Please select at least one answer';
        incorrectAnswerNotyfication.classList.add('active');
    }
});

startQuizBtn.addEventListener('click', () => {
    startQuizBtn.textContent = '';
    startQuizBtn.classList.add('active');
    setTimeout(() => {
        startQuizPanel.classList.add('hidden');
    }, 2500);
    setTimeout(() => {
        quizInterface.classList.remove('hidden');
    }, 3500);
});

window.addEventListener('DOMContentLoaded', () => {
    getRandomCountryNames();
    getOneCorrectCountryName();
});
