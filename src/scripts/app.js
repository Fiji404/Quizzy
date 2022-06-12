const expandQuizzesListBtn = document.querySelector('.nav__change-quiz-btn');
const quizzesListSection = document.querySelector('.quizes-list-section');

expandQuizzesListBtn.addEventListener('click', () => {
    quizzesListSection.classList.toggle('active');
});
