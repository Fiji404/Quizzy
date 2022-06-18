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

const fetchQuestionFromDB = () => {
    const getRandomQuestionId = Math.trunc(Math.random() * 4);
    get(child(dbRef, `Quizes/HTML/Questions/Question${getRandomQuestionId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            quizInterfaceQuestion.textContent = snapshot.val();
            console.log(snapshot.val());
        } else {
            console.log('No data available');
        }
    });
    return getRandomQuestionId;
};

const fetchAvailableAnswersFromDB = () => {
    const currentIdQuestion = fetchQuestionFromDB();
    get(child(dbRef, `Quizes/HTML/Answers/Question${currentIdQuestion}Answers`)).then((snapshot) => {
        if (snapshot.exists()) {
            const answersArray = Array.from(snapshot.val());
            answersArray.forEach((value, idx) => {
                answersList[idx].textContent = value;
            }) 
           
            console.log(snapshot.val());
        } else {
            console.log('No data available');
        }
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
        fetchQuestionFromDB();
        fetchAvailableAnswersFromDB();
    }, 3500);
});
