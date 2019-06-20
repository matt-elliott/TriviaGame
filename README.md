# Trivia Game Repository
### A simple browser based trivia game built with JavaScript

#### TASKS
- [ ] Write simple algorithm for game
- [ ] Write JavaScript program following algorithm
- [ ] Sketch front end design
- [ ] Code front end design
- [ ] Clean up JavaScript

## Trivia Game Algorithm
##### Start
To begin, we will add an event listener with jQuery to listen for clicks on our start button and fire the startGame function
```
$(button) on click (startGame)
```

Inside startGame() we will get our questions, set up our varaibles, and then fire the askQuestion() function
```
function startGame()
  var points = 0;
  var questionElement = where we'll send question text
  var answerElement = where we'll place the selection of answers 
  var questions = {
    question1: {
      question: Does John Snow know nothing?
      answers: ['Yes, John Snow knows nothing.',
                'Nope,' …]
      correctAnser: answers[0],
      points: 10
    },
    etc…
  }

  askQuestions()
```

In askQuestion we are just setting an interval and asking a new question every n seconds. We also listen for user answer and progress to next question if answered before timeout. On timeout display correct answer and move to next question
```
function askQuestions()
  var count = 0;
  var timer;

  function ask()
    if(count < questions.length)
      1. get random question/answers and show to user
      2. add listener click on answers and call answered()
      3: if time is up:
        - use timeOut to show correct answer
        - remove answer listener
        - wait for next question in loop
      4. increment count by one
    else count > questions.length
      1. stop timer
      2. add total points and set equal to totalPoints
      3. add points of correct answers and set equal to points
      4. if points < totalPoints
        - call winGame()
      5. if points > totalPoints = win
        - call loseGame()      
      6. else if points === totalPoints
        - call drawGame()
  
  function answered()
    1. stop timer
    2. if user selects correct answer:
      - call correctAnswer()
    3. if user selects wrong anser:
      - call wrongAnser()

  function correctAnswer()
    1. add 1 to points
    2. add question to correctAnswers array
    3. remove from questions array 
    4. show winning message
    5. call startTimer()

  function wrongAnswer()
    1. add question to wrongAnswers array
    2. remove from questions array 
    3. show losing message
    4. call startTimer()

  function winGame()
    1. show total points
    2. show winning message
    3. show retry button
      - calls startTimer

function loseGame()
    1. show total points
    2. show losing message
    3. show retry button
      - calls startTimer

  function startTimer()
    timer = setInterval(ask, 15000);

  startTimer()
```
