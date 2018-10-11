
(function () {
    

    //Set up the questions
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {

        //Display the question
        document.querySelector('.question').innerHTML = '<h2>' + this.question + '</h2>';
        document.querySelector('.score').innerHTML = '<h2> </h2>';
        console.log(this.question);

        //Display the answers

        var ques = '';

        for (var i = 0; i < this.answers.length; i++){

            ques += ('<li>' + '<input name="answer" type="radio" value="' + i + '" id="radio-' + i + '" /> ' + this.answers[i] + '</li><br>');
        
            console.log(i + ': ' + this.answers[i]);
        }

            document.querySelector('.answers').innerHTML = ques;
            document.querySelector('.inputBtn').innerHTML = '<h2>Submit<h2/>';

    }  

    Question.prototype.checkAnswer = function(ans){

        if (ans === this.correct){
            console.log('CORRECT!');
            document.querySelector('.score').innerHTML = '<h2>Correct!</h2>';
            
            //if answered correctly, remove the question from the array so they are not practicing questions they know
            arrayOfQuestions.splice(randomNum, 1);
            
            
        }else{
            console.log('INCORRECT');
            document.querySelector('.score').innerHTML = '<h2>Wrong!</h2>';
        }

    }

    Question.prototype.displayScore = function(score){

        //Display the score

    }

    //Questions
    var q1 = new Question('Are Cats just mean dogs?', ['No', 'Yes'], 1);
    var q2 = new Question('What animal is actually created by the CIA to spy on Americans?', ['Squirrels', 'Pigeons', 'Rats'], 1);
    var q3 = new Question('What is the difference between crocos and alligates?', ['Difference color', 'Alligates are actually fish', 'Crocos are vegetarian'], 2);

    //Array of all Questions
    var arrayOfQuestions = [q1, q2, q3];
    var restartArray = [q1, q2, q3];
    
    
    /////////////////////////////
    ///Variables and Functions///
    /////////////////////////////
    
    var startQuizBtn = document.querySelector('.startQuizBtn');
    var quizStarted = false;
    var continueToNextQuestion = false;
    var randomNum;
    var score;
    
    function nextQuestion(){
        //Pick a random number to determine what questions to call
        
        if(arrayOfQuestions.length > 0){
            randomNum = Math.floor(Math.random() * arrayOfQuestions.length);

            //Randomly Display the Question and answers
            arrayOfQuestions[randomNum].displayQuestion();
        }else{
            
            document.querySelector('.score').innerHTML = '<h2>You\'ve answered all of the questions correctly!</h2>';
            
            //Remove the Questions and answers
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.answers').style.display = 'none';
            document.querySelector('.inputBtn').style.display = 'none';
            
            startQuizBtn.innerHTML = 'Restart';
            quizStarted = false;
            
            //Re-add the array questions
            arrayOfQuestions = restartArray;
            
        }

    }
    
    
    /////////////
    ///Buttons///
    /////////////
    
    startQuizBtn.addEventListener('click', function(){
        
        if(!quizStarted){
            
            //Remove the Questions and answers
            document.querySelector('.question').style.display = 'block';
            document.querySelector('.answers').style.display = 'block';
            document.querySelector('.inputBtn').style.display = 'block';
            
            quizStarted = true;
            startQuizBtn.innerHTML = 'Exit';
            
            nextQuestion()
            
        }else{
            
            //You chose to quit the Quiz
            quizStarted = false;
            startQuizBtn.innerHTML = 'Start';
            
            //Remove the Questions and answers
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.answers').style.display = 'none';
            document.querySelector('.inputBtn').style.display = 'none';
            
        }

    })
    
   
    document.querySelector('.inputBtn').addEventListener('click', function(){
        
        if(continueToNextQuestion){
            nextQuestion()
            continueToNextQuestion = false;
            document.querySelector('.inputBtn').innerHTML = '<h2>Submit<h2/>';
            
        }else{
            continueToNextQuestion = true;
            document.querySelector('.inputBtn').innerHTML = '<h2>Continue<h2/>';
            
            var radioAnswer = document.getElementsByName('answer');
        
            for (var i = 0; i < radioAnswer.length; i++){
                //disable all of the radios
                radioAnswer[i].disabled = true;
                
                //Find the checked radio value
                if(radioAnswer[i].checked){
                
                    arrayOfQuestions[randomNum].checkAnswer(i);
                
                }
            }
        }
        
    })
    
    
})();
