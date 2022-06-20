const expandQuizzesListBtn = document.querySelector('.nav__change-quiz-btn');
const backFromQuizesBtn = document.querySelector('.nav__back-from-quizes');
const quizesContainer = document.querySelector('.available-quizzes-grid');
const quizesSections = document.querySelectorAll('.quiz-figure');
const redirectNotyfication = document.querySelector('.redirect-notification');
const bodyElement = document.body;

expandQuizzesListBtn.addEventListener('click', () => {
    bodyElement.classList.add('not-interactive');
    quizesContainer.scrollIntoView({
        behavior: 'smooth',
    });
});

backFromQuizesBtn.addEventListener('click', () => {
    bodyElement.classList.remove('not-interactive');
});

quizesSections.forEach((el) => {
    el.addEventListener('click', (e) => {
        if (bodyElement.classList.contains('not-interactive')) {
            const targetQuizName = e.target.dataset.quizName;
            redirectNotyfication.classList.add('active');
            setTimeout(() => {
                window.location.replace(`${window.location.href}${targetQuizName}.html`);
            }, 3000);
        }
    });
});
