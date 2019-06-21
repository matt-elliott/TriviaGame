var game = {
  init: function () {
    this.count = 0;
    this.points = 0;
    this.questionTimeOut;
    this.questionDOMElement = $('.questionCard #question');
    this.answerDOMElement = $('.questionCard #answers');
    this.questionElement = $('#question');
    this.answerElement = $('#amswers');
    this.questions = [
      {
        question: 'Does John Snow know nothing?',
        answers: ['Yes, John Snow knows nothing.',
          'Nope, John Snow knows everything',
          'It\'s Jon Snow you uncultured swine!'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which name is given to the bastards of The Reach?',
        answers: ['Anti-fa',
          'Poppies',
          'Flowers'
        ],
        correctAnswer: 2
      },
      {
        question: 'Which House is a direct vassal of House Baratheon of King\'s Landing?',
        answers: ['House Targaryen',
          'House Stark',
          'House Stokeworth'
        ],
        correctAnswer: 2
      },
      {
        question: 'At Hoster Tully\'s funeral, who shot the burning arrow that hit its mark?',
        answers: ['Brynden Tully',
          'Ted Bundy',
          'Bogdon Stank',
                    
        ],
        correctAnswer: 0
      },
      {
        question: 'How many fingertips did Stannis Baratheon chop off of Davos\' hand(s)?',
        answers: ['Three',
          'Four',
          'None, he cut off his ears.'
        ],
        correctAnswer: 1
      }
    ];
    this.askedQuestions = [];
    
    this.askQuestions();
  },
  ask: function() {
    // this.timer = setInterval(this.ask, 3000);
    //this.startClock();
    // this.ask();
  },
  askQuestions: function() {
    // console.log('asking question');
    // 1. get random question/answers and show to user
    // console.log(game.count < game.questionsLength);

    if (this.questions.length === 0) {
      // 1. stop timer
      clearTimeout(this.questionTimeOut);
      var pointsToWin = Math.floor(this.askedQuestions.length * .65);
      
      $('.questionCard').html('<h1>Game Over!</h1>');

      if(this.points > pointsToWin) {
        $('.questionCard').append('<h2>You Win!</h2>');
      } else if(this.points === pointsToWin) {
        $('.questionCard').append('<h2>You Tied!</h2>');
      } else {
        $('.questionCard').append('<h2>You Lose!</h2>');
      }
    } else {
      this.questionIndex =  Math.ceil(
          Math.random() * this.questions.length - 1
        ).toString(8);

      this.randomQuestionObject = this.questions[this.questionIndex];

      this.randomQuestion = this.randomQuestionObject.question;
      this.answers = this.randomQuestionObject.answers;
      this.correctAnswer = this.randomQuestionObject.correctAnswer;

      this.questionDOMElement.text(this.randomQuestion);
      
      this.answers.forEach(function(answer) {
        game.answerDOMElement.append(`<li class="answer">${answer}</li>`);
      });
      
      //remove question from questions object and move to answered
      this.askedQuestions.push(this.questions[this.questionIndex]);
      this.questions.splice(this.questionIndex, 1);

      //start 30 second countdown
      this.questionTimeOut = setTimeout(
        this.showCorrectAnswer,
      2000);
      
      //   2. add listener click on answers and call answered()
      $('.questionCard .answer').on('click', this.answered);
    } 

    //   4. increment count by one}
    this.count++;
  
  },
  answered: function() {
    // clear all timers
    if($(event.currentTarget).text() === game.answers[game.correctAnswer]) {
      console.log('right answer!')
      game.points++;
    } else {
      //play ouch sound
    }
  },
  startClock: function() {
    // console.log('startCLock');
  },
  showCorrectAnswer: function() {
    console.log(`Times up!\nCorrect answer is ${game.answers[game.correctAnswer]} `);
    $('.questionCard #answers').empty();

    //restart question asking
    game.askQuestions();
  }
}

$('document').ready( game.init() );