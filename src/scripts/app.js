const expandQuizzesListBtn = document.querySelector('.nav__change-quiz-btn');
const backFromQuizesBtn = document.querySelector('.nav__back-from-quizes');
const quizesContainer = document.querySelector('.available-quizzes-grid');
const bodyElement = document.body;

expandQuizzesListBtn.addEventListener('click', () => {
    bodyElement.classList.add('not-interactive');
    quizesContainer.scrollIntoView({
        behavior: "smooth",
        top: '-50px',
    })
});

backFromQuizesBtn.addEventListener('click', () => {
    bodyElement.classList.remove('not-interactive');
});
