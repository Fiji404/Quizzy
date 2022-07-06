'use strict';
const preferencesOptionList = document.querySelectorAll('.settings-options-list');
const preferencesOptions = document.querySelectorAll('.settings-options-list__item');
const numberOfQuestions = document.querySelector('.number-of-questions');
const quizSettingsExpandChoicesBtn = document.querySelectorAll('.quiz-settings__expand-btn');
const quizSettingsCollapseChoicesBtn = document.querySelectorAll('.quiz-settings__collapse-btn');
const changePreferencesBtn = document.querySelector('.nav__change-quiz-btn');
const quizSettingsPanel = document.querySelector('.quiz-settings');
const questionsNumberPreference = document.querySelector('.number-of-questions')
let choosenQuestionsNumber = 0;
choosenQuestionsNumber = localStorage.getItem('option0');
numberOfQuestions.textContent = choosenQuestionsNumber;
preferencesOptionList.forEach((listNode, idx) => {
    listNode.addEventListener('click', ({ target }) => {
        const childActiveClassElements = listNode.querySelectorAll('.active');
        childActiveClassElements.forEach(el => el.classList.remove('active'));
        target.classList.add('active');
        localStorage.setItem('option' + idx, target.textContent);
        choosenQuestionsNumber = localStorage.getItem('option0');
        numberOfQuestions.textContent = choosenQuestionsNumber;
    });
});

preferencesOptions.forEach(el => {
    const localStorageValues = Object.values(localStorage);
    localStorageValues.forEach(value => {
        if (el.textContent === value) {
            el.classList.add('active');
        }
    });
});

quizSettingsCollapseChoicesBtn.forEach(el => {
    el.addEventListener('click', () => {
        const targetParentElement = el.closest('header');
        targetParentElement.nextElementSibling.classList.add('hidden');
        el.previousElementSibling.classList.remove('active');
    });
});

changePreferencesBtn.addEventListener('click', () => {
    quizSettingsPanel.classList.toggle('active');
})

quizSettingsExpandChoicesBtn.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.add('active');
        const targetParentElement = el.closest('header');
        targetParentElement.nextElementSibling.classList.remove('hidden');
    });
});
