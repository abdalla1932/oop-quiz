export class Quiz {
    constructor(questions, amount) {

        this.questions = questions;
        this.amount = amount;
        this.currentQuesElement = document.getElementById('current');
        this.totalAmountElement = document.getElementById('totalAmount');
        this.questionElement = document.getElementById('question');
        this.rowAnswer = document.getElementById('rowAnswer');
        this.scoreElement = document.getElementById('score');
        this.tryBtn = document.getElementById('tryBtn');
        this.score=0;
        this.nextBtn = document.getElementById('next');
        this.checkElement = document.getElementsByName('answer')
        this.current = 0;
        this.isCorrect = false;
        this.nextBtn.addEventListener('click', this.nextQuestion.bind(this));
        this.tryBtn.addEventListener('click', this.tryAgain.bind(this))

        this.showQuestion()


    }
    nextQuestion() {
        let checkAnswer = [...this.checkElement].filter(element => element.checked);
        if (checkAnswer.length == 0) {
            $('.alert').fadeIn(500);
        } else {
            $('.alert').fadeOut(500);
            this.isCorrect = this.checkAnswers(checkAnswer[0].value);
            (this.isCorrect) ? $('#Correct').fadeIn(500, () => { this.show() }) : $('#inCorrect').fadeIn(500, () => { this.show() });
        }
    }
    show() {
        $('#Correct').fadeOut(0);
        $('#inCorrect').fadeOut(0);
        this.current++;
        (this.current < this.amount) ? this.showQuestion() : this.finish();
    }

    showQuestion() {
        this.questionElement.innerHTML = this.questions[this.current].question;
        this.currentQuesElement.innerHTML = this.current + 1;
        this.totalAmountElement.innerHTML = this.amount;

        let answers = this.getAnswers(this.questions[this.current])
        this.showAnswer(answers)
    }
    getAnswers(current) {
        let answers = [current.correct_answer, ...current.incorrect_answers]

        let ranNums = [],
            i = answers.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(answers[j]);
            answers.splice(j, 1);
        }
        return ranNums;
    }

    showAnswer(answersArray) {
        let cartoona = ``;
        for (let i = 0; i < answersArray.length; i++) {
            cartoona += ` <div class="form-check py-2">
            <label class="form-check-label">
                <input type="radio" class="form-check-input " name="answer" id="q${i}" value="${answersArray[i]}">
                ${answersArray[i]}
            </label>
        </div>`

        }
        this.rowAnswer.innerHTML = cartoona;
    }

    checkAnswers(value) {
        let correct = false;

        if (this.questions[this.current].correct_answer == value) {
            correct = true;
            this.score++;
        }
        else {
            correct = false;
        }

        return correct
    }


    finish() {

        this.scoreElement.innerHTML = this.score

        $('#quiz').fadeOut(500,()=>{
            $('#finish').fadeIn(500)
        })
    }
    tryAgain()
    {
        $('#finish').fadeOut(500,()=>{
            $('#setting').fadeIn(500)
        })
    }
}