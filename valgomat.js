"use strict";

// VARIABLES
var SP = {};
SP.partier = ['va','sd','rl','il','ll','kd','bl'];
SP.fullname = {
  va: 'Venstrealliansen',
  sd: 'Sosialdemokratisk liste',
  rl: 'Realistlista',
  il: 'Internasjonal liste',
  ll: 'Liberal liste',
  kd: 'Kristendemokratisk liste',
  bl: 'Blå liste'
}

SP.response = {
  va: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  sd: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rl: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  il: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ll: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  kd: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  bl: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

SP.length = 15;
SP.currentQuestion = 6;


// ONLOAD
window.onload = async function() {
  try {
    loadCSV();
  } catch (e) {
    console.log(e);
  }
  drawParties();
  drawProgressBar();
};

function drawProgressBar() {
  var build = document.createDocumentFragment();

  for(let i = 0; i < SP.length; i++) {
    let elem = document.createElement('div');
    elem.classList.add('progress-' + (i < SP.currentQuestion ? 'active' : 'inactive'));

    build.appendChild(elem);
  }

  document.getElementById('progress-bar').appendChild(build);
}

// FUNCTIONS
async function loadCSV() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './liste.csv', true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          resolve();
        } else {
          reject(xhr);
        }
      }
    }
    xhr.send(null);
  });
}

function drawParties() {
  var div = document.createElement('div');
  div.classList.add('graph');

  for(let p in SP.partier) {
    let party = SP.partier[p];
    let fullname = SP.fullname[party];

    let bar = document.createElement('div');
    bar.classList.add('bar');

    bar.style.height = '10em';
    bar.id = party;

    div.appendChild(bar);
  }

  document.getElementById('graph').appendChild(div);
}

function check(e) {
  e = e.firstElementChild;
  if(e.classList.contains('poll-active')) return;

  var checked = document.getElementsByClassName('poll-active')[0];
  if(checked === undefined) {
    /* enable next-button */
  }

  checked.classList.replace('poll-active', 'poll-inactive');
  e.classList.replace('poll-inactive', 'poll-active');
}
