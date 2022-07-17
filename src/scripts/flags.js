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
const answersListItems = document.querySelectorAll('.answers-list__item');
let currentFlagName;
const userPoints = { correctAnswers: 0, incorrectAnswers: 0 };
let currentQuestionNumber = 1;

const getOneCorrectCountryName = () => {
    const questionsAmount =
        questionsNumberPreference.textContent.length === 11
            ? questionsNumberPreference.textContent.slice(0, 1)
            : questionsNumberPreference.textContent.slice(0, 2);
    if (!(currentQuestionNumber === Number(questionsAmount) + 1)) {
        const flagNameFromLabelElement = labelAnswersList[Math.trunc(Math.random() * 4)];
        imgFlagElement.src = `https://countryflagsapi.com/svg/${flagNameFromLabelElement.textContent}`;
        currentFlagName = flagNameFromLabelElement.textContent;
    }
};

const getRandomCountryNames = () => {
    currentQuestionElement.textContent = currentQuestionNumber;
    for (const el of inputAnswerElements) {
        el.disabled = false;
    }
    nextQuestionBtn.disabled = false;
    const flagsListLength = Object.keys(flagsList).length;

    labelAnswersList.forEach(el => {
        el.textContent = flagsList[Math.trunc(Math.random() * flagsListLength) + 1];
    });
    setTimeout(() => {
        quizInterface.classList.remove('active');
    }, 1000);
};

const checkIfAnswerIsCorrect = () => {
    // quizInterface.classList.add('active');

    inputAnswerElements.forEach(el => {
        if (el.checked) {
            const elCheckedParent = el.closest('.answers-list__item');
            const nextSiblingLabelElement = el.nextElementSibling;
            elCheckedParent.classList.add('answers-list__item_checked');
            if (nextSiblingLabelElement.textContent === currentFlagName) {
                userPoints.correctAnswers++;
                setTimeout(() => {
                    elCheckedParent.classList.replace('answers-list__item_checked', 'answers-list__item_correct');
                }, 1500);
                setTimeout(() => {
                    elCheckedParent.classList.remove('answers-list__item_correct');
                }, 2500);
            } else if (nextSiblingLabelElement.textContent !== currentFlagName) {
                userPoints.incorrectAnswers++;
                setTimeout(() => {
                    elCheckedParent.classList.replace('answers-list__item_checked', 'answers-list__item_bad');
                    inputAnswerElements.forEach(input => {
                        const elCheckedParent = input.closest('.answers-list__item');
                        input.nextElementSibling.textContent === currentFlagName
                            ? elCheckedParent.classList.add('answers-list__item_correct')
                            : null;
                    });
                }, 1500);
                setTimeout(() => {
                    elCheckedParent.classList.remove('answers-list__item_bad');
                    answersListItems.forEach(el => el.classList.remove('answers-list__item_correct'));
                }, 2500);
            }
        }
        const questionsAmount =
            questionsNumberPreference.textContent.length === 11
                ? questionsNumberPreference.textContent.slice(0, 1)
                : questionsNumberPreference.textContent.slice(0, 2);
        if (!(currentQuestionNumber === Number(questionsAmount) + 1))
            setTimeout(() => {
                quizInterface.classList.add('active');
            }, 2700);
        if (currentQuestionNumber === Number(questionsAmount) + 1) {
            handleFinalPlayerScores();
        }
        el.checked = false;
    });
};

const handleFinalPlayerScores = () => {
    quizInterface.classList.remove('active');
    quizStatisticsDashboard.classList.add('active');
    if (userPoints.correctAnswers > userPoints.incorrectAnswers) {
        resultInfoTitle.classList.add('quiz-statistics__result-info_good');
        resultInfoTitle.textContent = 'Congratulations, you have answered most of the questions correctly !';
    } else if (userPoints.correctAnswers < userPoints.incorrectAnswers) {
        resultInfoTitle.classList.add('quiz-statistics__result-info_bad');
        resultInfoTitle.textContent = 'Please try again, your answers was incorrect.';
    }
    imgFlagElement.src = '#';
    quizStatisticsCorrectAnswers.textContent = userPoints.correctAnswers;
    quizStatisticsBadAnswers.textContent = userPoints.incorrectAnswers;
};

nextQuestionBtn.addEventListener('click', () => {
    const isAnyAnswerChecked = inputAnswerElements.some(el => el.checked);
    if (isAnyAnswerChecked) {
        for (const el of inputAnswerElements) {
            el.disabled = true;
        }
        nextQuestionBtn.disabled = true;
        incorrectAnswerNotyfication.textContent = '';
        incorrectAnswerNotyfication.classList.remove('active');
        currentQuestionNumber++;
        checkIfAnswerIsCorrect();
        setTimeout(() => {
            getRandomCountryNames();
            getOneCorrectCountryName();
        }, 4000);
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
});

window.addEventListener('DOMContentLoaded', () => {
    getRandomCountryNames();
    getOneCorrectCountryName();
});
