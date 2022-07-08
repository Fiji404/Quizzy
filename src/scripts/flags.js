'use strict';
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
const resultInfoTitle = document.querySelector('.quiz-statistics__result-info');
const questionsNumberPreference = document.querySelector('.number-of-questions');
let currentFlagName;
let correctAnswersCounter = 0;
let badAnswersCounter = 0;
let currentQuestionNumber = 1;

const getOneCorrectCountryName = () => {
    const questionsAmount = questionsNumberPreference.textContent.length === 11 ? questionsNumberPreference.textContent.slice(0, 1) : questionsNumberPreference.textContent.slice(0, 2)
    if (!(currentQuestionNumber === Number(questionsAmount) + 1)) {
        const flagNameFromLabelElement = labelAnswersList[Math.trunc(Math.random() * 4)];
        imgFlagElement.src = `https://countryflagsapi.com/svg/${flagNameFromLabelElement.textContent}`;
        currentFlagName = flagNameFromLabelElement.textContent;
    }
};

const getRandomCountryNames = () => {
    const flagsListLength = Object.keys(flagsList).length;
    labelAnswersList.forEach(el => {
        el.textContent = flagsList[Math.trunc(Math.random() * flagsListLength) + 1];
    });
    setTimeout(() => {
        quizInterface.classList.remove('active');
    }, 1000);
};

const checkIfAnswerIsCorrect = () => {
    quizInterface.classList.add('active');
    inputAnswerElements.forEach(el => {
        if (el.checked) {
            const nextSiblingLabelElement = el.nextElementSibling;
            if (nextSiblingLabelElement.textContent === currentFlagName) {
                correctAnswersCounter++;
                console.log('Correct answer', correctAnswersCounter);
            } else if (nextSiblingLabelElement.textContent !== currentFlagName) {
                badAnswersCounter++;
                console.log('Bad answer',badAnswersCounter);
            }
        }
        const questionsAmount = questionsNumberPreference.textContent.length === 11 ? questionsNumberPreference.textContent.slice(0, 1) : questionsNumberPreference.textContent.slice(0, 2)
        if (currentQuestionNumber === Number(questionsAmount) + 1) {
            handleFinalPlayerScores();
        }
        el.checked = false;
    });
};

const handleFinalPlayerScores = () => {
    quizInterface.classList.remove('active');
    quizStatisticsDashboard.classList.add('active');
    if (correctAnswersCounter > badAnswersCounter) {
        resultInfoTitle.classList.add('quiz-statistics__result-info_good');
        resultInfoTitle.textContent = 'Congratulations, you have answered most of the questions correctly !'
    } else if (correctAnswersCounter < badAnswersCounter) {
        resultInfoTitle.classList.add('quiz-statistics__result-info_bad');
        resultInfoTitle.textContent = 'Please try again, your answers was incorrect.'
    }
    imgFlagElement.src = '#';
    quizStatisticsCorrectAnswers.textContent = correctAnswersCounter;
    quizStatisticsBadAnswers.textContent = badAnswersCounter;
};

nextQuestionBtn.addEventListener('click', () => {
    const isAnyAnswerChecked = inputAnswerElements.some(el => el.checked);
    if (isAnyAnswerChecked) {
        incorrectAnswerNotyfication.textContent = '';
        incorrectAnswerNotyfication.classList.remove('active');
        currentQuestionNumber++;
        currentQuestionElement.textContent = currentQuestionNumber;
        checkIfAnswerIsCorrect();
        getRandomCountryNames();
        getOneCorrectCountryName();
    } else {
        incorrectAnswerNotyfication.textContent = 'Please select any answer !';
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
