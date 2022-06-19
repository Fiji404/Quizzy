import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBuVmQxClXUyM2I8P9yaqL79Xd2BK2Itrk',
    authDomain: 'quiz-app-ccdfc.firebaseapp.com',
    databaseURL: 'https://quiz-app-ccdfc-default-rtdb.firebaseio.com',
    projectId: 'quiz-app-ccdfc',
    storageBucket: 'quiz-app-ccdfc.appspot.com',
    messagingSenderId: '184250219658',
    appId: '1:184250219658:web:3a9964f69e5498d648c173',
    measurementId: 'G-7TZYXEJR9W',
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

const startQuizBtn = document.querySelector('.intro-section__btn');
const introSection = document.querySelector('.intro-section');
const quizInterface = document.querySelector('.quiz-interface');
const quizInterfaceQuestion = document.querySelector('.quiz-interface__question');
const answersList = document.querySelectorAll('.answers-list__label');
const nextQuestionBtn = document.querySelector('.quiz-interface__give-answer-btn');
const inputAnswersElements = [...document.querySelectorAll('.answers-list__input')];
const numberOfQuestion = document.querySelector('.quiz-interface__question-number > output');
const incorrectFilledAnswer = document.querySelector('.quiz-interface__error');
let currentQuestionNumber = 1;
let correctAnswersCounter = 0;
let questionId = 0;

const fetchRandomQuestionFromDB = () => {
    const getRandomQuestionId = Math.trunc(Math.random() * 4) + 1;
    questionId = getRandomQuestionId;
    get(child(dbRef, `Quizes/HTML/Questions/Question${getRandomQuestionId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            quizInterfaceQuestion.textContent = snapshot.val();
        }
    });
};

const fetchAvailableAnswersFromDB = () => {
    get(child(dbRef, `Quizes/HTML/Answers/Question${questionId}Answers`)).then((snapshot) => {
        if (snapshot.exists()) {
            const answersArray = Array.from(snapshot.val());
            answersArray.forEach((value, idx) => {
                answersList[idx].textContent = value;
            });
        }
    });
};

const validateAnswer = () => {
    incorrectFilledAnswer.classList.remove('active');
    incorrectFilledAnswer.textContent = '';
    if (currentQuestionNumber > 10) currentQuestionNumber = 10;
    numberOfQuestion.textContent = currentQuestionNumber;
    currentQuestionNumber++
    inputAnswersElements.forEach((el) => {
        quizInterface.classList.add('active');
        let nextTextNodeOfCheckedEl;
        if (el.checked) nextTextNodeOfCheckedEl = el.nextElementSibling.textContent;

        get(child(dbRef, `Quizes/HTML/correctAnswers/Question${questionId}Answer`)).then((snapshot) => {
            if (snapshot.exists()) {
                quizInterface.classList.remove('active');
                const checkCorrectAnswer = snapshot.val() === nextTextNodeOfCheckedEl;
                if (checkCorrectAnswer) {
                    correctAnswersCounter++;
                    console.log(correctAnswersCounter);
                    
                }
                for (element of inputAnswersElements) element.checked = false;
            }
        });
    });
};

startQuizBtn.addEventListener('click', () => {
    startQuizBtn.textContent = '';
    startQuizBtn.classList.add('active');
    setTimeout(() => {
        introSection.classList.add('hidden');
    }, 2500);
    setTimeout(() => {
        quizInterface.classList.remove('hidden');
    }, 3500);
});

nextQuestionBtn.addEventListener('click', () => {
    const isAnswerChecked = inputAnswersElements.some((el) => el.checked);
    if (isAnswerChecked) {
        validateAnswer();
        fetchRandomQuestionFromDB();
        fetchAvailableAnswersFromDB();
    } else {
        incorrectFilledAnswer.textContent = 'Please select at least one answer';
        incorrectFilledAnswer.classList.add('active');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    fetchRandomQuestionFromDB();
    fetchAvailableAnswersFromDB();
});
