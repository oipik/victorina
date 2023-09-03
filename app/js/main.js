document.addEventListener('DOMContentLoaded', () => {
    let btnStart = document.querySelector('.wrapper__btn'),
        questionsMain = document.querySelector('.wrapper__questions'),
        questions = document.querySelectorAll('.wrapper__question'),
        currentQuestion = document.querySelector('.current'),
        totalQuestions = document.querySelector('.total'),
        nextQuestion = document.querySelector('.next'),
        index = 0;

    currentQuestion.textContent = index + 1;
    totalQuestions.textContent = questions.length;

    btnStart.addEventListener('click', () => {
        btnStart.style.display = 'none';
        questionsMain.style.display = 'block';
        nextQuestion.style.display = 'block';
        showQuestion();
    })

    nextQuestion.addEventListener('click', () => {
        let counter = 0;
        console.log('hello')
        questions.forEach(item => {
            if(item.style.display === 'block') {
                document.querySelectorAll('.wrapper__answers-item input').forEach(item => {
                    if(item.checked) {
                        counter++;
                    }
                }) 
                
                if(counter == 0) {
                    alert('Вы должны выбрать хотя бы один ответ.');
                    return;
                } else {
                    index++;
                    hideAllQuestions();
                    showQuestion();
                    showCurrentQuestion()
                }
            }
        })
    });

    function hideAllQuestions() {
        questions.forEach(item => item.style.display = 'none');
    }

    function showQuestion() {
        questions.forEach((item, i) => {
            if(index == i) {
                item.style.display = 'block';
            } 
        });
        index++;
    }

    function showCurrentQuestion() {
        currentQuestion.textContent = index + 1;
    }
    
})