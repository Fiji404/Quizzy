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
let randomQuestionId = 0;
const queriedQuestionsArray = [];
const quizName = document.body.dataset.quizName;

const fetchRandomQuestionFromDB = () => {
    quizInterface.classList.add('active')
    randomQuestionId = Math.trunc(Math.random() * 20) + 1;
    randomQuestionId = checkIsQuestionWasDrawn(randomQuestionId);
    get(child(dbRef, `Quizes/${quizName}/Questions/Question${randomQuestionId}`)).then(snapshot => {
        if (snapshot.exists()) {
            quizInterfaceQuestion.textContent = snapshot.val();
        }
    });
    fetchAvailableAnswersOfQuestionFromDB()
};

const checkIsQuestionWasDrawn = questionID => {
    const isQuestionWasDrawn = queriedQuestionsArray.includes(questionID);
    if (isQuestionWasDrawn) {
        while (queriedQuestionsArray.includes(questionID)) {
            questionID = Math.trunc(Math.random() * 20) + 1;
        }
    } else {
        queriedQuestionsArray.push(questionID);
    }
    return questionID;
};



const fetchAvailableAnswersOfQuestionFromDB = () => {
    get(child(dbRef, `Quizes/${quizName}/Answers/Question${randomQuestionId}Answers`)).then(snapshot => {
        quizInterface.classList.remove('active');
        if (snapshot.exists()) {
            const availableAnswersArray = Array.from(snapshot.val());
            availableAnswersArray.forEach((val, idx) => {
                answersLabelElements[idx].textContent = val;
            });
        }
    });
};

const validateAnswerFromUser = () => {
    if (currentQuestionNumber === 10) {
        nextQuestionBtn.textContent = 'Finish quiz';
    }
    if (!(currentQuestionNumber === 10)) {
        inputAnswersElements.forEach(el => {
            let nextSiblingLabelElementOfInput;
            if (el.checked) nextSiblingLabelElementOfInput = el.nextElementSibling.textContent;
            get(child(dbRef, `Quizes/${quizName}/correctAnswers/Question${randomQuestionId}Answer`)).then(snapshot => {
                if (snapshot.exists()) {
                    if (snapshot.val() === nextSiblingLabelElementOfInput) {
                        correctAnswersCounter++;
                        console.log('Correct:', correctAnswersCounter);
                    } else if (nextSiblingLabelElementOfInput !== snapshot.val() && el.checked) {
                        badAnswersCounter++;
                        console.log('Bad:', badAnswersCounter);
                    }
                    el.checked = false
                } else {
                    console.log('no data');
                }
            });
        });

    }
    currentQuestionNumber++;
    currentQuestionElement.textContent = currentQuestionNumber;
};

const handleFinalPlayerScores = () => {
    quizInterface.classList.remove('active');
    quizStatisticsDashboard.classList.add('active');
    quizStatisticsCorrectAnswers.textContent = correctAnswersCounter;
    quizStatisticsBadAnswers.textContent = badAnswersCounter;
};


nextQuestionBtn.addEventListener('click', () => {
    const isAnswerChecked = inputAnswersElements.some(el => el.checked);
    console.log('Current Question num:', currentQuestionNumber)
    const isQuizFinished = currentQuestionNumber === 10;
    if (!isQuizFinished && isAnswerChecked) {
        validateAnswerFromUser();
        fetchRandomQuestionFromDB();
        incorrectAnswerNotyfication.textContent = '';
        incorrectAnswerNotyfication.classList.remove('active');
    } else if (!isAnswerChecked) {
        incorrectAnswerNotyfication.textContent = 'Please select at least one answer';
        incorrectAnswerNotyfication.classList.add('active');
    } else if (isQuizFinished) {
        handleFinalPlayerScores();
    } 
});

window.addEventListener('DOMContentLoaded', () => {
    fetchRandomQuestionFromDB();
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