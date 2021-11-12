import {Quiz} from './quiz.js'
export class Setting{

    constructor(){
        this.category = document.getElementById('category');
        this.NumOfQuestions = document.getElementById('Number');
        this.startBtn = document.getElementById('startBtn');
        this.difficulty= document.getElementsByName('difficulty');

        this.startBtn.addEventListener('click',this.startQuiz.bind(this))
 
    }
    async startQuiz()
    {
        let amount = this.NumOfQuestions.value;
        let category = this.category.value;
        let difficulty = [...this.difficulty].filter(element => element.checked);
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
        let result = await this.fetchUrl(url)
        if (result.length>0) {
            $('#setting').fadeOut(500,()=>{
                $('#quiz').fadeIn(500)
            })
            new Quiz(result,amount);
        }

        

    }
    async fetchUrl(url)
    {
       let apiResponse = await fetch(url);
       let data = await apiResponse.json();
       return data.results 
      
    }
}