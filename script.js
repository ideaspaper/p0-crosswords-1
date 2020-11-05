var data = [
  {
    clue: 'Other programmers from different programming language should be able to understand my code if I make a ___.',
    answer: 'pseudocode',
    x: 1,
    y: 1,
    orientation: 'across',
    legend: 1
  },
  {
    clue: 'I am one of the primitive data types in JavaScript.',
    answer: 'numbers',
    x: 7,
    y: 3,
    orientation: 'across',
    legend: 4
  },
  {
    clue: 'One of the conventions when making a variable name.',
    answer: 'camelcase',
    x: 12,
    y: 6,
    orientation: 'across',
    legend: 5
  },
  {
    clue: 'You should make an ___ before implementing your code.',
    answer: 'algorithm',
    x: 4,
    y: 8,
    orientation: 'across',
    legend: 6
  },
  {
    clue: 'Use ___ in pseudocode to print something.',
    answer: 'display',
    x: 3,
    y: 11,
    orientation: 'across',
    legend: 8
  },
  {
    clue: 'The creator of JavaScript.',
    answer: 'brendaneich',
    x: 11,
    y: 11,
    orientation: 'across',
    legend: 9
  },
  {
    clue: 'true false',
    answer: 'boolean',
    x: 6,
    y: 15,
    orientation: 'across',
    legend: 10
  },
  {
    clue: 'IF in pseudocode should be ended with ___.',
    answer: 'endif',
    x: 3,
    y: 1,
    orientation: 'down',
    legend: 2
  },
  {
    clue: 'if is syntax for making a ___ statement.',
    answer: 'conditional',
    x: 7,
    y: 1,
    orientation: 'down',
    legend: 3
  },
  {
    clue: '==, !==, ===, !==, >, <, >=, <=',
    answer: 'comparison',
    x: 12,
    y: 6,
    orientation: 'down',
    legend: 5
  },
  {
    clue: 'I am one of the primitive data types in JavaScript.',
    answer: 'string',
    x: 19,
    y: 8,
    orientation: 'down',
    legend: 7
  },
];

function createTable(questions) {
  const maxRowCol = [0, 0];

  questions.forEach(question => {
    let tempx = question.x;
    let tempy = question.y;

    question.orientation === 'across'
      ? tempx += question.answer.length - 1
      : tempy += question.answer.length - 1;

    if (tempx > maxRowCol[0]) {
      maxRowCol[0] = tempx;
    }

    if (tempy > maxRowCol[1]) {
      maxRowCol[1] = tempy;
    }
  });

  let tableOutput = '';
  for (let i = 0; i < maxRowCol[1]; i++) {
    let temp = '';
    for (let j = 0; j < maxRowCol[0]; j++) {
      temp += '<td></td>'
    }
    temp = '<tr>' + temp + '</tr>';
    tableOutput += temp;
  }
  tableOutput = '<table id=crosswords-table>' + tableOutput + '</table>';
  return tableOutput;
}

function createClues(questions) {
  let across = '';
  let down = '';

  questions.forEach(question => {
    if (question.orientation === 'across') {
      across += `<li value="${question.legend}">${question.clue}</li>`;
    } else {
      down += `<li value="${question.legend}">${question.clue}</li>`;
    }
  });

  across = '<ol id="across">' + across + '</ol>';
  down = '<ol id="down">' + down + '</ol>';

  let output = '<h2>Across</h2>' + across + '<h2>Down</h2>' + down;
  return output + '<h3>Press Enter to check the answer</h3>';
}

function putInputs(table, questions) {
  const input = '<input maxlength="1" val="" type="text" tabindex="-1" onClick="this.select();"></input>';
  questions.forEach(question => {
    if (question.orientation === 'across') {
      for (let i = question.x - 1; i < question.x - 1 + question.answer.length; i++) {
        table.tBodies[0].rows[question.y - 1].cells[i].classList.add(`${question.orientation}-${question.legend}`);
        table.tBodies[0].rows[question.y - 1].cells[i].innerHTML = input;
      }
    } else {
      for (let i = question.y - 1; i < question.y - 1 + question.answer.length; i++) {
        table.tBodies[0].rows[i].cells[question.x - 1].classList.add(`${question.orientation}-${question.legend}`);
        table.tBodies[0].rows[i].cells[question.x - 1].innerHTML = input;
      }
    }
  });

  questions.forEach(question => {
    table.tBodies[0].rows[question.y - 1].cells[question.x - 1].innerHTML += `<span>${question.legend}</span>`;
  });
}

function isRight(questions) {
  let rightAnswers = [];
  let falseAnswers = [];

  for (let i = 0; i < questions.length; i++) {
    let inputs = document.getElementsByClassName(`${questions[i].orientation}-${questions[i].legend}`);
    let answer = '';
    for (let j = 0; j < inputs.length; j++) {
      answer += inputs[j].children[0].value;
    }

    if (answer.toLowerCase() === questions[i].answer.toLowerCase()) {
      rightAnswers.push(`${questions[i].orientation}-${questions[i].legend}`);
    } else {
      falseAnswers.push(`${questions[i].orientation}-${questions[i].legend}`);
    }
  }

  for (let i = 0; i < falseAnswers.length; i++) {
    let inputs = document.getElementsByClassName(falseAnswers[i]);
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].children[0].classList.remove('done');
    }
  }

  for (let i = 0; i < rightAnswers.length; i++) {
    let inputs = document.getElementsByClassName(rightAnswers[i]);
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].children[0].classList.add('done');
    }
  }
}

function gotoIndex(x, y) {
  console.log(x, y);
}

let crosswordsContainer = document.getElementById('crosswords-container');
let crosswordsClues = document.getElementById('crosswords-clues');
crosswordsContainer.innerHTML = createTable(data);
crosswordsClues.innerHTML = createClues(data);
let crosswordsTable = document.getElementById('crosswords-table');
putInputs(crosswordsTable, data);

document.onkeypress = function (e) {
  e.key === 'Enter'
    ? isRight(data)
    : {};
};