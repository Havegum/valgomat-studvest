"use strict";

// VARIABLES
var SP = {};

SP.currentPanel = 0;

SP.priorities = [];

SP.userResponse = [];

SP.panels = [];

SP.ol = [];

var a; // For testing purposes

// ONLOAD
window.addEventListener('load', async function() {
  try {
    var json = loadCSV();
    json = JSON.parse(await json);
  } catch (e) {
    console.error(e);
  }

  Object.keys(json).forEach(key => {
    SP[key] = json[key];
  });


  await drawParties();
  a = new QuestionPanel(0, true);
  a.display();
}, {once:true});

// FUNCTIONS
async function loadCSV() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    }
    xhr.send(null);
  });
}

// Global functions
function scoreAll(final) {
  SP.max = 0;
  var graph = document.getElementById('graph');
  var sortedParties = Object.keys(SP.partier)
    .map(scoreForParty) // Compare score to user response
    .map(scaleParty) // Scale party graph
    .slice()
    .sort(comparePartyScore) // Sort parties by size

  if(!final) {

    setTimeout(() => {
      graph.style.width = '';
      graph.classList.add('graph-notext');
      sortedParties.map((o, i) => relocateParty(o, i))
    }, 250);
  } else {
    setTimeout(() => {
      graph.style.width = '24.8em';
      graph.classList.remove('graph-notext');
      sortedParties.forEach((o, i) => {
        o.elem.style.transform = 'translateX('+(i*4)+'em)';
        o.elem.style.backgroundColor = 'var(--'+o.party+')';
        o.elem.getElementsByClassName('graph-text')[0].style.bottom = (i%2 ? '-3em' : '');
      });

    }, 250);
    return sortedParties.map((o) => o.party);
 }
}

function scoreForParty(party) {
  var sum = SP.userResponse.reduce((sum, point, i) => {
    if(point === undefined) return sum;
    let diff = Math.abs(SP.partyResponses[party][i] - point)
    let base = 2 - diff - (point % 2);
    let multiplier = 1;

    let userPriority = (SP.priorities.indexOf(i) > -1);
    if(userPriority) {
      multiplier *= SP.priorityMultiplier;

      let partyPriority = (SP.partyPriorities[party].indexOf(i) > -1);
      if(partyPriority) {
        multiplier *= SP.partyPriorityMultiplier;
      }
    }

    base *= multiplier;
    return sum + base;
  }, 0);
  SP.max = Math.max(SP.max, sum);
  return { party: party, sum: sum };
}

function scaleParty(o) {
  o.elem = document.getElementById(o.party);
  o.elem.style.height = 'calc(' + (o.sum / SP.max * 100 + (SP.currentPanel - SP.question.length)) + '% + .3em)';
  return o;
}

function relocateParty(o, i) {
  o.elem.style.transform = barTranslateX(i);
  o.elem.style.backgroundColor = /*(o.sum === SP.max) ? 'var(--main)' : */''; // Uncomment for colored leader
  return o;
}

function comparePartyScore(a, b) {
  let comparison = 0;
  if(a.sum > b.sum) {
    comparison = -1;
  } else if (a.sum < b.sum) {
    comparison = 1;
  }
  return comparison;
}

function barTranslateX(i) {
  return 'translateX(' + (1.7 * i) + 'em)';
}

function drawParties() {
  var build = document.createDocumentFragment();
  var i = 0;
  for(let party in SP.partier) {
    let fullname = SP.partier[party];

    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.id = party;
    bar.style.transform = barTranslateX(i);
    bar.style.height = '50%';
    // bar.style.opacity = 0.30 + (i*0.10); // Uncomment for greyscale color coding


    let p = document.createElement('p');
    p.textContent = fullname;
    p.classList.add('graph-text', 'noselect');
    p.style.color = 'var(--'+party+')';
    bar.appendChild(p);

    build.appendChild(bar);
    i++;
  }
  var div = document.getElementById('graph')
  div.classList.add('graph');
  div.appendChild(build);
  scoreAll(true);

  setTimeout(function () {
    new TextAssist('Når du tar valgomaten vil partiene skjules, på slutten får du vite hvilke partier som er mest enig i dine valg', div);
  }, 1000);
}

function check(e, panel) {
  var parent = e.parentNode;
  var e = e.firstElementChild;
  if(e.classList.contains('poll-active')) return;

  var checked = parent.getElementsByClassName('poll-active')[0];
  if(checked === undefined) {
    panel.navbar.forward.classList.remove('navbtn-right-disabled');
  } else {
    checked.classList.replace('poll-active', 'poll-inactive');
  }

  e.classList.replace('poll-inactive', 'poll-active');
}
