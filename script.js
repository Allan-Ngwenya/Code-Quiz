//Variables for the script and using .getelement by ID's defined in my html files
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
//function to start the game and shufle the order of the questions
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
//reset state function on next button for a new question
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//All the questions included in the quiz
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<scripting>', correct: false },
      { text: '<javascript>', correct: false },
      { text: '<js>', correct: false }
    ]
  },
  {
    question: '29 is of what data type?',
    answers: [
      { text: 'Integer', correct: true },
      { text: 'Boolean', correct: false },
      { text: 'String', correct: false },
      { text: 'Float', correct: false }
    ]
  },
  {
    question: 'Which of the following is the correct syntax to display “Alert” in an alert box using JavaScript?',
    answers: [
      { text: 'alert(“Alert”);', correct: true },
      { text: 'msgbox(“Alert”);', correct: false },
      { text: 'alertbox(“Alert”);', correct: false },
      { text: 'msg(“Alert”);', correct: false }
    ]
  },
  {
    question: 'Which is the correct syntax for displaying data in the console?',
    answers: [
      { text: 'console.log();', correct: true },
      { text: 'log.console();', correct: false },
      { text: 'console.log[];', correct: false },
      { text: 'console.log;', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax for declaring a function?',
    answers: [
      { text: 'function myFunction()', correct: true },
      { text: 'var myFunction()', correct: false },
      { text: 'myFunction function()', correct: false },
      { text: 'function my Function()', correct: false }
    ]
  }
];

StartDownCounting();
//function for the timer
function StartDownCounting() {
  let interval = setInterval(() => {
    if (quizTime <= 30 && quizTime >= 13) {
      timeLeft.style.color = "green";
    }
    else if (quizTime <= 10 && quizTime >= 0) {
      timeLeft.style.color = "red";
    }

    timeLeft.innerText = quizTime;
    quizTime -= 1;

    if (quizTime < 0) {
      clearInterval(interval);
      alert("Time's up, try again")
      location.href = 'index.html';

    }
  }, 1000);
}
