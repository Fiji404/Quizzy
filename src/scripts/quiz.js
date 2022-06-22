'use strict';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBuVmQxClXUyM2I8P9yaqL79Xd2BK2Itrk',
    authDomain: 'quiz-app-ccdfc.firebaseapp.com',
    databaseURL: 'https://quiz-app-ccdfc-default-rtdb.firebaseio.com',
    projectId: 'quiz-app-ccdfc',
    storageBucket: 'quiz-app-ccdfc.appspot.com',
    appId: '1:184250219658:web:3a9964f69e5498d648c173',
    measurementId: 'G-7TZYXEJR9W',
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

const startQuizBtn = document.querySelector('.intro-section__btn');
const startQuizPanel = document.querySelector('.intro-section');
const quizInterface = document.querySelector('.quiz-interface');
const quizInterfaceQuestion = document.querySelector('.quiz-interface__question');
const answersLabelElements = document.querySelectorAll('.answers-list__label');
const nextQuestionBtn = document.querySelector('.quiz-interface__give-answer-btn');
const inputAnswersElements = [...document.querySelectorAll('.answers-list__input')];
const currentQuestionElement = document.querySelector('.quiz-interface__question-number > output');
const incorrectAnswerNotyfication = document.querySelector('.quiz-interface__error');
const quizStatisticsDashboard = document.querySelector('.finished-quiz-result');
const quizStatisticsCorrectAnswers = document.querySelector('.quiz-statistics__output_correct');
const quizStatisticsBadAnswers = document.querySelector('.quiz-statistics__output_badly');
let currentQuestionNumber = 1;
let correctAnswersCounter = 0;
let badAnswersCounter = 0;
let randomQuestionId;
const queriedQuestionsArray = [];

const fetchRandomQuestionFromDB = () => {
    randomQuestionId = Math.trunc(Math.random() * 20) + 1;
    const isQuestionWasDrawn = queriedQuestionsArray.includes(randomQuestionId);
    if (!isQuestionWasDrawn) {
        queriedQuestionsArray.push(randomQuestionId);
    } else {
        randomQuestionId = checkForQueriedQuestion();
        queriedQuestionsArray.push(randomQuestionId);
    }
    console.log(queriedQuestionsArray);
    get(child(dbRef, `Quizes/HTML/Questions/Question${randomQuestionId}`)).then(snapshot => {
        if (snapshot.exists()) {
            quizInterfaceQuestion.textContent = snapshot.val();
        }
    });
};

const checkForQueriedQuestion = () => {
    while (queriedQuestionsArray.includes(randomQuestionId)) {
        randomQuestionId = Math.trunc(Math.random() * 20) + 1;
    }
    return randomQuestionId;
};

const fetchAvailableAnswersOfQuestionFromDB = () => {
    get(child(dbRef, `Quizes/HTML/Answers/Question${randomQuestionId}Answers`)).then(snapshot => {
        if (snapshot.exists()) {
            const answersResponseArray = snapshot.val();
            answersResponseArray.forEach((value, idx) => {
                answersLabelElements[idx].textContent = value;
            });
        }
    });
};

const validateAnswer = () => {
    incorrectAnswerNotyfication.classList.remove('active');
    incorrectAnswerNotyfication.textContent = '';
    if (currentQuestionNumber === 10) {
        nextQuestionBtn.textContent = 'Finish quiz';
        currentQuestionNumber = 10;
    }
    quizInterface.classList.add('active');
    currentQuestionElement.textContent = currentQuestionNumber;
    inputAnswersElements.forEach(el => {
        const nextTextNodeOfCheckedEl = el.checked ? el.nextElementSibling.textContent : false;
        get(child(dbRef, `Quizes/HTML/correctAnswers/Question${randomQuestionId}Answer`)).then(snapshot => {
            if (snapshot.exists()) {
                quizInterface.classList.remove('active');
                const checkCorrectAnswer = snapshot.val() === nextTextNodeOfCheckedEl;
                if (checkCorrectAnswer) {
                    correctAnswersCounter++;
                } else if (nextTextNodeOfCheckedEl) {
                    badAnswersCounter++;
                }
                el.checked = false;
            }
        });
    });
    currentQuestionNumber++
};

const handleFinalPlayerScores = () => {
    quizInterface.classList.remove('active');
    quizStatisticsDashboard.classList.add('active');
    quizStatisticsCorrectAnswers.textContent = correctAnswersCounter;
    quizStatisticsBadAnswers.textContent = badAnswersCounter;
};

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

nextQuestionBtn.addEventListener('click', () => {
    const isAnswerChecked = inputAnswersElements.some(el => el.checked);
    const isQuizFinished = currentQuestionNumber - 1 === 10;
    if (!isQuizFinished && isAnswerChecked) {
        fetchRandomQuestionFromDB();
        fetchAvailableAnswersOfQuestionFromDB();
        validateAnswer();
        console.log(currentQuestionNumber)
    } else if (!isAnswerChecked) {
        incorrectAnswerNotyfication.textContent = 'Please select at least one answer';
        incorrectAnswerNotyfication.classList.add('active');
    } else {
        handleFinalPlayerScores();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    fetchRandomQuestionFromDB();
    fetchAvailableAnswersOfQuestionFromDB();
});
