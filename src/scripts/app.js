const expandQuizzesListBtn = document.querySelector('.nav__change-quiz-btn');
const quizzesListSection = document.querySelector('.quizes-list-section');

expandQuizzesListBtn.addEventListener('click', () => {
    const interactivityStatusOfPage = document.body.dataset.notInteractive;
    document.body.dataset.notInteractive = true;
    if (interactivityStatusOfPage) {
        document.body.dataset.notInteractive = false;
    }
    quizzesListSection.classList.toggle('active');
});
