'use strict';
const preferencesOptionList = document.querySelectorAll('.settings-options-list');
const preferencesOptions = [...document.querySelectorAll('.settings-options-list__item')];
const numberOfQuestions = document.querySelector('.number-of-questions');
const quizSettingsExpandChoicesBtn = document.querySelectorAll('.quiz-settings__expand-btn');
const quizSettingsCollapseChoicesBtn = document.querySelectorAll('.quiz-settings__collapse-btn');
const changePreferencesBtn = document.querySelector('.nav__change-quiz-btn');
const quizSettingsPanel = document.querySelector('.quiz-settings');
const questionsNumberPreference = document.querySelector('.number-of-questions');
const applyChangesBtn = document.querySelector('.quiz-settings_apply-changes-btn');
const fetchUserPreferences = () => {
    const localStorageValues = Object.values(localStorage);
    questionsNumberPreference.textContent = localStorage.getItem('Option 1');
    preferencesOptions.forEach(el => {
        localStorageValues.forEach(value => {
            if (el.textContent === value) {
                el.classList.add('active');
            }
        });
    });
};
preferencesOptionList.forEach((listNode, idx) => {
    listNode.addEventListener('click', ({ target }) => {
        if (target.classList.contains('settings-options-list__item')) {
            listNode.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            target.classList.add('active');
            applyChangesBtn.classList.add('active');
            localStorage.setItem('Option ' + (idx + 1), target.textContent);
        }
    });
});

applyChangesBtn.addEventListener('click', () => {
    applyChangesBtn.classList.remove('active');
    window.location.reload();
    fetchUserPreferences();
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
});

quizSettingsExpandChoicesBtn.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.add('active');
        const targetParentElement = el.closest('header');
        targetParentElement.nextElementSibling.classList.remove('hidden');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    fetchUserPreferences();
});