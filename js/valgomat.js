// VARIABLES
let SP = {};

SP.currentPanel = 0;

SP.priorities = [];

SP.userResponse = [];

SP.panels = [];

SP.ol = [];

let a; // For testing purposes

// Global functions
function loadJSON() {
  'use strict';
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    };
    xhr.send(null);
  });
}

function barTranslateX(i) {
  'use strict';
  return 'translate3d(' + (1.7 * i) + 'em,0,0)';
}

function scoreForParty(party) {
  'use strict';
  let sum = SP.userResponse.reduce(function(sum, point, i) {
    if(point === undefined) { return sum; }
    let diff = Math.abs(SP.partyResponses[party][i] - point);
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
  'use strict';
  o.elem = document.getElementById(o.party);
  o.elem.style.height = 'calc(' + (o.sum / SP.max * 100 + (SP.currentPanel - SP.question.length)) + '% + .3em)';
  return o;
}

function relocateParty(o, i) {
  'use strict';
  o.elem.parentNode.style.transform = barTranslateX(i);
  o.elem.style.backgroundColor = '';
  return o;
}

function comparePartyScore(a, b) {
  'use strict';
  let comparison = 0;
  if(a.sum > b.sum) {
    comparison = -1;
  } else if (a.sum < b.sum) {
    comparison = 1;
  }
  return comparison;
}

function check(e, panel) {
  'use strict';
  let parent = e.parentNode;
  e = e.firstElementChild;
  if(e.classList.contains('poll-active')) { return; }

  let checked = parent.getElementsByClassName('poll-active')[0];
  if(checked === undefined) {
    panel.navbar.forward.classList.remove('navbtn-right-disabled');
  } else {
    checked.classList.replace('poll-active', 'poll-inactive');
  }

  e.classList.replace('poll-inactive', 'poll-active');
}

function scoreAll(final) {
  'use strict';
  SP.max = 0;
  let graph = document.getElementById('graph');
  let sortedParties = Object.keys(SP.partier)
    .map(scoreForParty) // Compare score to user response
    .map(scaleParty) // Scale party graph
    .slice()
    .sort(comparePartyScore); // Sort parties by size

  if(!final) {

    setTimeout(function() {
      graph.style.width = '';
      graph.classList.add('graph-notext');
      sortedParties.map(relocateParty);
    }, 250);

  } else {

    setTimeout(function () {
      graph.style.width = '24.8em';
      graph.classList.remove('graph-notext');
      sortedParties.forEach(function(o, i) {
        o.elem.parentNode.style.transform = 'translate3d('+(i*4)+'em,0,0)';
        o.elem.style.backgroundColor = 'var(--'+o.party+')';
        o.elem.getElementsByClassName('graph-text')[0].style.bottom = (i%2 ? '-3em' : '');
      });
    }, 250);
    return sortedParties.map((o) => o.party);
  }
}


function drawParties() {
  'use strict';
  let build = document.createDocumentFragment();
  Object.keys(SP.partier).forEach(function(party, i) {
    let fullname = SP.partier[party];

    let barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');
    barContainer.style.transform = barTranslateX(i);

    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.id = party;
    bar.style.height = '50%';
    barContainer.appendChild(bar);

    let p = document.createElement('p');
    p.textContent = fullname;
    p.classList.add('graph-text', 'noselect');
    p.style.color = 'var(--'+party+')';
    bar.appendChild(p);

    build.appendChild(barContainer);
  });
  let div = document.getElementById('graph');
  div.classList.add('graph');
  div.appendChild(build);
  scoreAll(true);

  setTimeout(function () {
    new TextAssist('Når du tar valgomaten vil listene skjules. På slutten får du vite hvilke lister som er mest enig i dine valg', div);
  }, 1000);
}

// ONLOAD
window.addEventListener('load', function() {
  'use strict';
  let json;
  try {
    json = loadJSON();
  } catch (e) {
    console.error(e);
  }

  json.then((response) => JSON.parse(response)).then(function(json) {

    Object.keys(json).forEach(function(key) {
      SP[key] = json[key];
    });

    let credit = new Credit(SP.byline);
    document.getElementById('byline').appendChild(credit.build);

    let scrollTarget = document.getElementsByClassName('credit-name')[0].offsetTop;
    window.scrollTo(0, scrollTarget);


    drawParties();
    a = new QuestionPanel(0, true);
    a.display();
  });

}, {once:true});
