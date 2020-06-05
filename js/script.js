//variables
var score = 0;
var currentQ = 0;

var questions = [
  {
    order: 1,
    question: "Do you have a Google Ad Grant Account?",
  },
  {
    order: 2,
    question: "Do you want us to manage your accounts throughout the year?",
  },
  {
    order: 3,
    question: "Do you want a one time audit of your account?",
  },
  {
    order: 4,
    question:
      "Do you want us to apply for a Google Ad Grant account for you? This includes account setup after the account is approved.",
  },
  {
    order: 5,
    question:
      "Do you want us to manage your accounts throughout the year after the application is completed? Including the first account setup.",
  },
];

$(document).ready(() => {
  showQuestion();

  $(`.button-container button`).on(`click`, function () {
    $(`.selected`).removeClass(`selected`);
    $(this).addClass(`selected`);
    $(".calculator-questions .line").css("margin", "45px 0 30px");
    $("#back").css("visibility", "visible");
    checkAnswer();
  });

  $(`#back a`).click(function (e) {
    e.preventDefault();
    $("#no").prop("disabled", false);
    restartQuiz();
  });
});

function showQuestion() {
  let question = questions[currentQ];
  $(`.question`).text(question.question);
}

function checkAnswer() {
  let question = questions[currentQ].order;
  //question 1
  if ($(`button.selected`).is("#yes") && question == 1) {
    currentQ = 1;
  } else if ($(`button.selected`).is("#no") && question == 1) {
    currentQ = 3;
  }
  //question 2
  if ($(`button.selected`).is("#yes") && question == 2) {
    score = "2000";
    currentQ = 10;
  } else if ($(`button.selected`).is("#no") && question == 2) {
    currentQ = 2;
    $("#no").prop("disabled", true);
  }
  //question 3
  if ($(`button.selected`).is("#yes") && question == 3) {
    score = "6000";
    currentQ = 10;
  } else if ($(`button.selected`).is("#no") && question == 3) {
    score = "0";
    currentQ = 10;
  } 
  //question 4
  if ($(`button.selected`).is("#yes") && question == 4) {
    currentQ++
  } else if ($(`button.selected`).is("#no") && question == 4) {
    $("#no").prop("disabled", true);
    currentQ++
  } 
  //question 5
  if ($(`button.selected`).is("#yes") && question == 5) {
    score = "2500";
    currentQ++;
  } else if ($(`button.selected`).is("#no") && question == 5) {
    score = "7500";
    currentQ++;
  } 
  //next question or results
  if (currentQ >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}

function showResults() {
  $(".question").hide();
  $(".button-container").hide();
  if (score === "2000" || score === "2500") {
    $("#total-cost").html(`$ <span id="cost">${score}</span> /month`);
  } else if (score === "6000" || score === "7500") {
    $("#total-cost").html(`$ <span id="cost">${score}</span>`);
  }
  $("#result").fadeIn();
  $("#back p").text("start");
}

function restartQuiz() {
  $("#result").hide();
  $(".question").show();
  $(".button-container").show();
  $(".calculator-questions .line").css("margin", "45px 0");
  $("#back").css("visibility", "hidden");
  $("#back p").text("back");
  score = 0;
  currentQ = 0;
  showQuestion();
}
