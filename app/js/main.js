document.addEventListener('DOMContentLoaded', () => {
    let btnStart = document.querySelector('.wrapper__btn'),
        questionsMain = document.querySelector('.wrapper__questions'),
        questions = document.querySelectorAll('.wrapper__question'),
        currentQuestion = document.querySelector('.current'),
        totalQuestions = document.querySelector('.total'),
        nextQuestionBtn = document.querySelector('.next'),
        buttonsBox = document.querySelector('.wrapper__buttons'),
        allAnswersShowBtn = document.querySelector('.wrapper__btn-answers'),
        startAgainBtn = document.querySelector('.wrapper__btn-again'),

        quizRezult = document.querySelector('.wrapper__quizResult'),
        quizScore = document.querySelector('.wrapper__quizScore span'),
        quizLevel = document.querySelector('.wrapper__quizLevel span'),
        textAbout = document.querySelector('.wrapper__text'),
        inputs = document.querySelectorAll('.wrapper__answers-item input'),

        answersAll = [],
        answersGet = [],
        answerShowOnPage,
        numberOfAnswers = 0;
        index = 0;

    answersAll = ['Да', '// Это комментарий.', 'Math.round(3.14)',];

    totalQuestions.textContent = questions.length;

    btnStart.addEventListener('click', () => {
        btnStart.style.display = 'none';
        questionsMain.style.display = 'block';
        nextQuestionBtn.style.display = 'block';
        showQuestion(index);
    })

    nextQuestionBtn.addEventListener('click', () => {
        let count = 0;

        questions.forEach((item, i) => {
            if (item.style.display == 'block') {
                inputs.forEach(input => {
                    if (input.checked) {
                        count++;
                        let value = document.querySelector(`label[for="${input.id}"]`).textContent;
                        answerShowOnPage = input.closest('ul').nextElementSibling;
                        addAnswer(i, value, answerShowOnPage);
                        input.checked = false;
                        return;
                    }
                })
            }
        })

        if (count === 0) {
            alert('Вы должны выбрать хотя бы один ответ.');
            return;
        }

        questions.forEach(item => item.style.display = 'none');
        index++;

        showQuestion(index);
    });

    function addAnswer(index, value, elem) {
        answersGet[index] = value;

        if (answersGet[index] == answersAll[index]) {
            numberOfAnswers++;
            elem.textContent = 'Правильно';
            elem.classList.add('correct');
        } else {
            elem.textContent = 'Неправильно';
            elem.classList.add('incorrect');
        }
    }

    function showQuestion(index) {
        questions.forEach((item, i) => {
            if (index == i) {
                item.style.display = 'block';
            }
        });

        if (index <= questions.length - 1) {
            currentQuestion.textContent = index + 1;
        } else {
            showResult();
        }
    }

    function showResult() {
        questionsMain.style.display = 'none';
        textAbout.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        quizScore.textContent = numberOfAnswers + ' / ' + questions.length;
        quizRezult.style.display = 'block';
        buttonsBox.style.display = 'block';
        if (numberOfAnswers >= 0 || numberOfAnswers <= 17) {
            quizLevel.textContent = 'К сожалению Вы не набрали достаточное количество балов для сдачи теста. Попробуйте снова';
        } else if (numberOfAnswers > 17 || numberOfAnswers <= 25) {
            quizLevel.textContent = 'Вы почти почти набрали необходимое количество баллов. Попробуйте еще раз';
        } else {
            quizLevel.textContent = 'Вы ответили на все вопросы. Молодец!';
        }
    }

    allAnswersShowBtn.addEventListener('click', () => {
        questionsMain.style.display = 'block';
        questions.forEach(item => item.style.display = 'block');
    });

    startAgainBtn.addEventListener('click', () => {
        quizRezult.style.display = 'none';
        buttonsBox.style.display = 'none';
        btnStart.style.display = 'block';
        questionsMain.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
    });

})