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
        openBtn = document.querySelector('.wrapper__btn-open'),
        closeBtn = document.querySelector('.wrapper__btn-close'),

        quizRezult = document.querySelector('.wrapper__quizResult'),
        quizScore = document.querySelector('.wrapper__quizScore span'),
        quizLevel = document.querySelector('.wrapper__quizLevel span'),
        textAbout = document.querySelector('.wrapper__text'),
        inputs = document.querySelectorAll('.wrapper__answers-item input'),

        answersAll = [],
        answersGet = [],
        answerShowOnPage,
        numberOfAnswers = 0,
        index = 0;

    answersAll = ['Да', '// Это комментарий.', 'Math.round(3.14)', '=', 'Math.max(x, y)', "<script src='sample1.js'>", 'onclick', '<head> и <body>', 'Нет', 'function MyFunction()', 'true', 'if (i != 2)', "var colors = ['yellow', 'purple', 'blue']", 'var Num;', "alert('Hello World');", 'myFunction()', 'Да', 'if (i == 2)', 'navigator.appName', '<script>', '/* Это многострочный комментарий*/', 'while (i <= 7)', 'document.getElementById("demo").innerHTML = "Hello World!";', 'for (i = 0; i <= 10; i++)',];

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
                    if (input.checked && input.closest('.wrapper__question').style.display == 'block') {
                        count++;
                        let value = document.querySelector(`label[for="${input.id}"]`).textContent;
                        answerShowOnPage = input.closest('ul').nextElementSibling;
                        checkAnswer(i, value, answerShowOnPage);
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

    function checkAnswer(index, value, elem) {
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

        if (index < questions.length) {
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
        if (numberOfAnswers <= 17) {
            quizLevel.textContent = 'К сожалению Вы не набрали достаточное количество балов для сдачи теста. Попробуйте снова';
        } else if (numberOfAnswers > 17 && numberOfAnswers <= 23) {
            quizLevel.textContent = 'Вы почти почти набрали необходимое количество баллов. Попробуйте еще раз';
        } else if(numberOfAnswers == questions.length) {
            quizLevel.textContent = 'Вы ответили на все вопросы. Молодец!';
        }
    }

    allAnswersShowBtn.addEventListener('click', (e) => {
        questionsMain.style.display = 'block';
        questions.forEach(item => item.style.display = 'block');
        e.target.style.display = 'none';
        closeBtn.style.display = 'inline-block';
    });

    closeBtn.addEventListener('click', (e) => {
        questionsMain.style.display = 'none';
        questions.forEach(item => item.style.display = 'none');
        e.target.style.display = 'none';
        openBtn.style.display = 'inline-block';
    });

    openBtn.addEventListener('click', (e) => {
        questionsMain.style.display = 'block';
        questions.forEach(item => item.style.display = 'block');
        e.target.style.display = 'none';
        closeBtn.style.display = 'inline-block';
    });

    startAgainBtn.addEventListener('click', () => {
        resetAll();
    });

    function resetAll() {
        quizRezult.style.display = 'none';
        buttonsBox.style.display = 'none';
        btnStart.style.display = 'block';
        questionsMain.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        closeBtn.style.display = 'none';
        openBtn.style.display = 'inline-block';
        index = 0;
        numberOfAnswers = 0;
        answersGet = [];
        textAbout.style.display = 'block';
        inputs.forEach(item => item.checked = false);
        document.querySelectorAll('.responce').forEach(item => item.classList.remove('correct', 'incorrect'));

        if(questionsMain.style.display == 'block') {
            questionsMain.style.display = 'none';
        }

        questions.forEach((item) => {
            if(item.style.display == 'block') {
                item.style.display = 'none';
            }
        });
    }
})