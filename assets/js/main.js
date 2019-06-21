var game = {
  init: function () {
    this.count = 0;
    this.questionDOMElement = $('.questionCard #question');
    this.answerDOMElement = $('.questionCard #answers');
    this.points = 0;
    this.questionElement = $('#question');
    this.answerElement = $('#amswers');
    this.questions = [
      {
        question: 'Does John Snow know nothing?',
        answers: ['Yes, John Snow knows nothing.',
          'Nope, John Snow knows everything',
          'It\'s Jon Snow you uncultured swine!'
        ],
        correctAnswer: 0,
        points: 1
      },
      {
        question: 'Which name is given to the bastards of The Reach?',
        answers: ['Anti-fa',
          'Poppies',
          'Flowers'
        ],
        correctAnswer: 2,
        points: 5
      },
      {
        question: 'Which House is a direct vassal of House Baratheon of King\'s Landing?',
        answers: ['House Targaryen',
          'House Stark',
          'House Stokeworth'
        ],
        correctAnswer: 2,
        points: 22
      },
      {
        question: 'At Hoster Tully\'s funeral, who shot the burning arrow that hit its mark?',
        answers: ['Brynden Tully',
          'Ted Bundy',
          'Bogdon Stank',
                    
        ],
        correctAnswer: 0,
        points: 20
      },
      {
        question: 'How many fingertips did Stannis Baratheon chop off of Davos\' hand(s)?',
        answers: ['Three',
          'Four',
          'None, he cut off his ears.'
        ],
        correctAnswer: 1,
        points: 100000
      
      }
    ];
    this.answeredQuestions = [];
    this.questionsLength = Object.keys(this.questions).length;

    this.askQuestions();
  },
  askQuestions: function() {
    // this.timer = setInterval(this.ask, 3000);
    //this.startClock();
    game.ask();
  },
  ask: function() {
    // console.log('asking question');
    // 1. get random question/answers and show to user
    // console.log(game.count < game.questionsLength);

    if (game.count < game.questionsLength) {
      game.questionIndex = Math.ceil(
                            Math.random() * game.questions.length - 1
                          ).toString(8);
      game.randomQuestionObject = game.questions[game.questionIndex];
      console.log(game.questionIndex);
      game.randomQuestion = game.randomQuestionObject.question;
      game.answers = game.randomQuestionObject.answers;
      game.correctAnswer = game.randomQuestionObject.correctAnswer;

      game.questionDOMElement.text(game.randomQuestion);
      
      game.answers.forEach(function(answer) {
        game.answerDOMElement.append(`<li class="answer">${answer}</li>`);
      });
      
      //setTimeout for 1500 to show to correct answer
      game.questionTimeOut = setTimeout(game.showAnswer, 2000);
      
      //   2. add listener click on answers and call answered()
      $('.questionCard .answer').on('click', game.answered);

      // console.log('count', game.count);
      // console.log(game.randomQuestion);
      // console.log(game.answers);
      // console.log(game.correctAnswer);
    } else {
      // if(game.count === game.questions.length)
      // console.log('game over');
      $('.questionCard').html('<h1>YOU LOSE</h1>');
      // 
      //   1. stop timer
      //   2. add total points and set equal to totalPoints
      

      console.log(game.points);
      //   3. add points of correct answers and set equal to points
      //   4. if points < totalPoints
      //     - call winGame()
      //   5. if points > totalPoints = win
      //     - call loseGame()      
      //   6. else if points === totalPoints
      //     - call drawGame()
      // }
    }
    //   4. increment count by one}
    game.count++;
  
  },
  answered: function() {
    // clear all timers
    if($(event.currentTarget).text() === game.answers[game.correctAnswer]) {
      console.log('right answer!')
      game.points += game.randomQuestionObject.points
      
      //remove question from questions object and move to answered
      // console.log(game.answeredQuestions);
      console.log(game.questions[game.questionIndex]);
      game.answeredQuestions.push(game.questions[game.questionIndex]);
      game.questions.splice(0, game.questionIndex);
      console.log(game.questions);

      console.log(game.answeredQuestions);
      console.log(game.questions);
    }
  },
  startClock: function() {
    // console.log('startCLock');
  },
  showAnswer: function() {
    // console.log(`Times up!\nCorrect answer is ${game.answers[game.correctAnswer]} `);
    $('.questionCard #answers').empty();
    game.askQuestions();
  }
}

$('document').ready( game.init() );