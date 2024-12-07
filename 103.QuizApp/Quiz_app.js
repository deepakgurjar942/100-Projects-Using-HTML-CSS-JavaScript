const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ]
  },
  {
    question:
      "Who was the first person to climb Mount Everest without supplemental oxygen?",
       answer: [
      { text:  "Charles Darwin", correct: false },
      { text: "Paul Bunyan", correct: false },
      { text: "Nikola Tesla", correct: true },
      { text: "Albert Einstein", correct: false },
    ]
  
  },
  {
    question: "What is the largest island in the world?",
    answer: [
        { text:   "Madagascar",correct: false },
        { text: "Greenland", correct: true },
        { text: "Iceland",  correct: false },
        { text: "New Zealand",correct: false },
      ]
  },
  {
    question: "What is the name of the largest ocean in the world?",
  
    answer: [
        { text:   "Atlantic Ocean",correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean",  correct: false },
        { text: "Pacific Ocean",correct: true },
      ]
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
  
    answer: [
        { text:   "Marie Curie",correct: true },
        { text: "Nelson Mandela", correct: false },
        { text: "Amelia Earhart",  correct: false },
        { text: "Marie Antoinette",correct: false },
      ]
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
   function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn")
      answerBtn.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct
      }
      button.addEventListener("click",selectAnswer)

    } )

    
   }
   function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
      answerBtn.removeChild(answerBtn.firstChild);
    }
   }
   function selectAnswer(e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect){
      selectBtn.classList.add("correct")
      score++;
    }
    else{
      selectBtn.classList.add("inCorrect")
    }
    Array.from(answerBtn.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct")
      }
      button.disabled = true;
    })
    nextBtn.style.display = "block";
   }
   function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
   }
   function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }
    else{
      showScore();
    }
   }
   nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }
    else{
      startQuiz();
    }
   })
   startQuiz()