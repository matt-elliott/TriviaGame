var game = {
  init: function () {
    this.count = 0;
    this.points = 0;
    this.thirtySecondTimer = null;
    this.questionTimeout = 30;
    this.loseGameGif = `<img src="https://media.giphy.com/media/W81qSImkIxkNq">/giphy.gif`;
    this.winGameGif = `<img src="https://media.giphy.com/media/1tGN00iMCj3Mc/giphy.gif">`;
    this.questions = [
      {
        question: 'Does John Snow know nothing?',
        answers: ['Yes, John Snow knows nothing.',
          'Nope, John Snow knows everything',
          'It\'s Jon Snow you uncultured swine!'
        ],
        correctAnswer: 0,
        gif: `<img src="https://media.giphy.com/media/ox0XTZD6N4SIg/giphy.gif">`
      },
      {
        question: 'Which name is given to the bastards of The Reach?',
        answers: ['Anti-fa',
          'Poppies',
          'Flowers'
        ],
        correctAnswer: 2,
        gif: `<img src="https://media.giphy.com/media/1iAQLpW2DRW2k/giphy.gif">`
      },
      {
        question: 'Which House is a direct vassal of House Baratheon of King\'s Landing?',
        answers: ['House Targaryen',
          'House Stark',
          'House Stokeworth'
        ],
        correctAnswer: 2,
        gif: `<img src="https://media.giphy.com/media/R9B9P4hRMYJr2/giphy.gif">`
      },
      {
        question: 'At Hoster Tully\'s funeral, who shot the burning arrow that hit its mark?',
        answers: ['Brynden Tully',
          'Ted Bundy',
          'Bogdon Stank',
                    
        ],
        correctAnswer: 0,
        gif: `<img src="https://media.giphy.com/media/picnPPoGf0yhG/giphy.gif">`
      },
      {
        question: 'How many fingertips did Stannis Baratheon chop off of Davos\' hand(s)?',
        answers: ['Three',
          'Four',
          'None, he cut off his ears.'
        ],
        correctAnswer: 1,
        gif: `<img src="https://media.giphy.com/media/3o7buahdzxQjWxgx1K/giphy.gif">`
      }
    ];
    this.askedQuestions = [];
    this.counterDOMElement = $('#counter');
    this.questionDOMElement = $('.questionCard #question');
    this.answerDOMElement = $('.questionCard #answers');
    this.questionElement = $('#question');
    this.answerElement = $('#amswers');

    $('#start').remove();
    $('#alert').hide();

    this.askQuestions();
  },
  countDown: function() {
    var date = new Date();
    var time = --this.questionTimeout;
    date.setSeconds(time);
    var seconds = date.toISOString().substr(17, 2);
    this.counterDOMElement.text(seconds);

    if(time === 00) {
      clearInterval(this.thirtySecondTimer);
      this.thirtySecondTimer = null;
      this.questionTimeout = 30;
      this.timeOut();
    }
  },
  askQuestions: function() {
    $('#alert').hide();

    if (this.questions.length === 0) {
      var pointsToWin = Math.floor(this.askedQuestions.length * .65);
      
      $('#alert').html('<h1>Game Over!</h1>').show();

      if(this.points > pointsToWin) {
        $('#alert').append('<h2>You Win!</h2>');
      } else if(this.points === pointsToWin) {
        $('#alert').append('<h2>You Tied!</h2>');
      } else {
        $('#alert').append('<h2>You Lose!</h2>');
      }
    } else {
      this.questionIndex =  Math.ceil(
          Math.random() * this.questions.length - 1
        ).toString(8);

      this.randomQuestionObject = this.questions[this.questionIndex];
      this.randomQuestion = this.randomQuestionObject.question;
      this.answers = this.randomQuestionObject.answers;
      this.correctAnswer = this.randomQuestionObject.correctAnswer;
      this.questionGif = this.randomQuestionObject.gif;
      console.log(this);
      this.questionDOMElement.text(this.randomQuestion);
      
      this.answerDOMElement.empty();
      this.answers.forEach(function(answer) {
        game.answerDOMElement.append(`<li class="answer">${answer}</li>`);
      });
      
      //remove question from questions object and move to answered
      this.askedQuestions.push(this.questions[this.questionIndex]);
      this.questions.splice(this.questionIndex, 1);

      //start 30 second countdown
      this.thirtySecondTimer = setInterval(
        game.countDown.bind(game),
      1000);
      
      //   2. add listener click on answers and call answered()
      $('.questionCard .answer').on('click', this.answered);
    } 

    //   4. increment count by one}
    this.count++;
  
  },
  answered: function() {
    // clear all timers
    clearInterval(game.thirtySecondTimer);
    game.thirtySecondTimer = null;

    if($(event.currentTarget).text() === game.answers[game.correctAnswer]) {
      $('#alert').html(`<h1>That's Right!</h1>`);
      game.points++;
    } else {
      //play ouch sound
      $('#alert').html(`<h1>Nope!</h1>`);
    }
    game.showCorrectAnswer();
  },
  timeOut: function() {
    $('#alert').html(`<h1>Times up!</h1>`).show();
    this.showCorrectAnswer();
  },
  showCorrectAnswer: function() {
    $('#alert').append(`<h3>Correct answer is ${game.answers[game.correctAnswer]}</h3>`).show();
    console.log(game.gif);
    $('#alert').append(game.questionGif);
    //restart question asking
    this.restart();
  },
  restart: function() {
    this.thirtySecondTimer = null;
    this.questionTimeout = 30;
    setTimeout(game.askQuestions.bind(game), 5000);
  }
}

$('document').ready( function() {
  $('#alert').hide();
  $('#start').on('click', game.init.bind(game));
});