const questions = [
    {
        // Programming Basics
        question:"What does HTML stand for ?",
        answers: [ "Hyper Transfer Markup Language" , "Hyper Text Makeup Language" , "Hyper Text Markup Language" ,"High Tech Modern Language"] ,
        correct : "Hyper Text Markup Language"
    },
    {
        question:"What does CSS stand for?",
        answers: [ "Computer Style Sheet" , "Cascading Style Sheets" , "Creative Styling System" ,"Custom Styling Script"] ,
        correct : "Cascading Style Sheets"
    },
    {
        question:"Which language is used to style web pages?",
        answers: [ "HTML" , "CSS" , "JAVASCRIPT" ,"PYTHON"] ,
        correct : "CSS"
    },
    {
        question:"What is the output of console.log(typeof []) in JavaScript?",
        answers: [ "Object" , "Array" , "List" ,"Undifined"] ,
        correct : "Object"
    },  
    {
        // Computer Science
        question:"What does CPU stand for?",
        answers: [ "Central Processing Unit" , "Computer Power Unit" , "Core Programming Unit" ,"Central Program Utility"] ,
        correct : "Central Processing Unit"
    },
    {
        question:"What is the smallest unit of data in a computer?",
        answers: [ "Byte" , "Bit" , "Kilobyte" ,"Megabyte"] ,
        correct : "Bit"
    },
    {
        // Operating Systems
        question:"What operating system is developed by Apple?",
        answers: [ "Windows" , "Linux" , "macOS" ,"Android"] ,
        correct : "macOS"
    },
    {
        question:"Which part of the operating system is responsible for managing hardware and software?",
        answers: [ "GUI" , "Kernel" , "File System" ,"Task Manager"] ,
        correct : "Kernel"
    },
    {
        // Web Development
        question:"Which tag is used to create a hyperlink in HTML?",
        answers: [ "<link>" , "<a>" , "<href>" ,"<h1>"] ,
        correct : "<a>"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.querySelector("#question");
const answerButtons = document.querySelector(".answer");
const nextButton = document.querySelector("#btn");
const scoreText = document.querySelector(".score");
const correctSound = new Audio("sounds/correct.mp3");
const Scoorgif = document.querySelector("#score-gif");
const gifDiv = document.querySelector(".gif");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    scoreText.style.display = "none";
    gifDiv.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    scoreText.style.display = "none" ;
    answerButtons.innerHTML = "";
    
}

function selectAnswer(answer, correctAnswer) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        if (button.innerText === correctAnswer && answer === correctAnswer ) {
            button.classList.add("correct");
            correctSound.play();
        } else if (button.innerText === answer && answer !== correctAnswer) {
            button.classList.add("wrong");
            playAudioFor1Second();
        }
        button.disabled = true;
        
    });

    if (answer === correctAnswer) {
        score++ ;
    }
    nextButton.style.display = "block";
    scoreText.style.display = "none" ;
}
nextButton.addEventListener("click", () => {
    currentQuestionIndex++ ;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        EndGame();
    }
});

function scoretext(){
    let message = "";
    if (score === questions.length) {
        message = "🎉 Amazing! You got all answers right! 🧠";
        document.querySelector(".comments").style.color = "green";
    } else if (score >= questions.length / 2) {
        message = "Good job! You did well! 😊 ";
        document.querySelector(".comments").style.color = "#3b53d3";
    } else {
        message = " Keep practicing! You can do better next time! 😐";
        document.querySelector(".comments").style.color = "lightcoral";
    }
    document.querySelector(".comments").innerHTML = message;
}

function EndGame(){
    alert("Quiz Finished! 🎉");
    scoreText.innerHTML = ` Your Score: ${score}/${questions.length}`;
    questionText.innerHTML = "";
    answerButtons.innerHTML = "";
    nextButton.style.display = "none" ;
    scoreText.style.display = "block" ;
    gifDiv.style.display = "flex";
    scoretext();
    GIFScore();
}

// Example function to update the score and show the GIF
function GIFScore() {
    if (score === questions.length) {
        document.querySelector(".perfect").style.display = "block";
        document.querySelector(".good").style.display = "none";
        document.querySelector(".sad").style.display = "none";
    } else if (score >= questions.length / 2) {
        document.querySelector(".perfect").style.display = "none";
        document.querySelector(".good").style.display = "block";
        document.querySelector(".sad").style.display = "none";
    } else {
        document.querySelector(".perfect").style.display = "none";
        document.querySelector(".good").style.display = "none";
        document.querySelector(".sad").style.display = "block";
    }
}

function playAudioFor1Second() {
    const wrongtSound = new Audio("sounds/wrong.mp3");
    
    // Play the audio
    wrongtSound.play();
    
    // Stop the audio after 1 second (1000 milliseconds)
    setTimeout(function() {
        wrongtSound.pause();  // Pause the audio
        wrongtSound.currentTime = 0;  // Reset audio to the beginning
    }, 1000);  // 1000 ms = 1 second
}

function fun(){
    alert("The game has started! Good luck! 😊");
}
startQuiz();


