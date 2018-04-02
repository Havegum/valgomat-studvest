"use strict";

// VARIABLES
var SP = {
  partier: {
    va: 'Venstrealliansen',
    sd: 'Sosialdemokratisk liste',
    rl: 'Realistlista',
    il: 'Internasjonal liste',
    ll: 'Liberal liste',
    kd: 'Kristendemokratisk liste',
    bl: 'Blå liste'
  },

  partyResponses: {
    va: [1, 2, 1, 0, 0, 2, 2, 1, 0, 1, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    sd: [2, 2, 0, 2, 2, 0, 1, 0, 2, 2, 2, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    rl: [0, 1, 1, 0, 0, 1, 0, 2, 2, 0, 0, 0, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    il: [1, 0, 2, 1, 1, 0, 2, 2, 1, 2, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    ll: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    kd: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    bl: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
},

  partyPriorities: {
    va: [0, 1, 2, 3, 4],
    sd: [1, 2, 3, 4, 5],
    rl: [2, 3, 4, 5, 6],
    il: [3, 4, 5, 6, 7],
    ll: [4, 5, 6, 7, 8],
    kd: [5, 6, 7, 8, 9],
    bl: [6, 7, 8, 9, 10]
  },

  priorities: [],

  partyPriorityMultiplier: 2,

  priorityMultiplier: 2,

  currentPanel: 0,

  userResponse: [],

  panels: [],

  ol: []

};

SP.question = [
  {
    shorthand: "Kjønnskvotering",
    text: "Det bør være kjønnskvotering til enkelte studielinjer.",
    case: "test- [reddit!](https://reddit.com) -- but did it work???"
  },
  {
    shorthand: "Konkurranseutsatt kantinedrift",
    text:"Kantinedriften på campus bør konkurranseutsettes.",
    case:""
  },
  {
    shorthand: "Akademika-monopol",
    text:"Akademika bør ikke ha monopol på pensumsalg på campus.",
    case:""
  },
  {
    shorthand: "Valgfri eksamensform",
    text:"Som student bør man selv få velge hvilken form for eksamen man skal ha.",
    case:""
  },
  {
    shorthand: "Eksamensfri 18. mai",
    text:"Det bør være eksamensfri 18. mai.",
    case:""
  },
  {
    shorthand: "Refusjonsprioritering fra Sammens helsefond",
    text:"Det var riktig å endre Sammens helsefond slik at refusjon til psykologtimer prioriteres fremfor legetimer.",
    case:""
  },
  {
    shorthand: "Meltzerfondet",
    text:"UiBs Meltzerfond bør stoppe å investere i Kongsberggruppen og oljeselskaper.",
    case:""
  },
  {
    shorthand: "UiBs varslingssystem for seksuell trakassering",
    text:"UiBs systemer for varsling av seksuell trakassering fungerer godt nok slik de er i dag.",
    case:""
  },
  {
    shorthand: "Hevet inntektsgrense for å få studiestøtte",
    text:"Inntektsgrensen for å få studiestøtte bør heves.",
    case:""
  },
  {
    shorthand: "Senket inntektsgrense for å få studiestøtte",
    text:"Inntektsgrensen for å få studiestøtte bør senkes.",
    case:""
  },
  {
    shorthand: "Religiøs aktivitet på UiB",
    text:"UiB bør legge til rette for mer religiøs aktivitet.",
    case:""
  },
  {
    shorthand: "Obligatorisk forelesningspodcast",
    text:"Det bør være obligatorisk lyd- og videoopptak fra alle forelesninger ved UiB.",
    case:""
  },
  {
    shorthand: "Studiestøtte",
    text:"Studiestøtten bør heves.",
    case:""
  },
  {
    shorthand: "Taco i kantinen",
    text:"Det bør være taco i kantinen hver fredag.",
    case:""
  },
  {
    shorthand: "Kjøttfrie dager i kantinen",
    text:"Kantinen bør ha flere kjøttfrie dager.",
    case:""
  },
  {
    shorthand: "Gratis pensum",
    text:"Det bør være gratis pensum for studenter.",
    case:""
  },
  {
    shorthand: "Kaffe på alle lesesaler og biblioteker",
    text:"Det bør være en form for kaffeutsalg på alle lesesaler og biblioteker.",
    case:""
  },
  {
    shorthand: "Økt semesteravgift",
    text:"UiB bør øke semesteravgiften.",
    case:""
  },
  {
    shorthand: "Alkoholfrie arrangementer i fadderuken",
    text:"Det bør legges mer vekt på alkoholfrie arrangementer i fadderuken.",
    case:""
  },
  {
    shorthand: "Døgnåpe lesesaler",
    text:"Lesesaler og/eller biblioteker bør være døgnåpne.",
    case:""
  },
  {
    shorthand: "Obligatorisk tilbakemelding på eksamenssensur",
    text:"Man bør få obligatorisk tilbakemelding på eksamenssensur?",
    case:""
  },
  {
    shorthand: "Internasjonale studenter",
    text:"UiB legger for dårlig til rette til å inkludere internasjonale studenter?",
    case:""
  },
  {
    shorthand: "«Hooke-forbud»",
    text:"Det bør innføres et «hooke-forbud» (innebærer både sex og klining) for faddere mot fadderbarn.",
    case:""
  }
]


var a; // For testing purposes

// ONLOAD
window.addEventListener('load', async function() {
  try {
    loadCSV();
  } catch (e) {
    console.error(e);
  }
  await drawParties();
  a = new QuestionPanel(0, true);
  a.display();
}, {once:true});

// Text assist v1
/*
function TextAssist(text, elem, action, leanRight) {
  SP.assist = this;
  this.text = text;
  this.open = true;
  var elemBounds = elem.getBoundingClientRect();

  var build = document.createElement('div');
  build.classList.add('text-assist-fullwrap', 'slidein-right');

  setTimeout(function () {
    build.classList.remove('slidein-right');
  }, 500);

  var div = document.createElement('div');
  div.classList.add('text-assist-inner');

  var p = document.createElement('p');
  p.classList.add('text-assist', 'noselect');
  p.textContent = text;

  var arrow = document.createElement('img');
  arrow.classList.add('text-assist-arrow', 'noselect');
  arrow.src = './arrow.svg';

  if(leanRight) {
    // Do this with flexbox order instead ..
    div.appendChild(arrow);
    div.appendChild(p);
  } else {
    div.appendChild(p);
    div.appendChild(arrow);
  }

  build.appendChild(div);

  this.close = function() {
    if(!SP.assist.open) return;
    build.classList.add('slideout-left');
    SP.assist.open = false;
    setTimeout(() => {
      build.classList.remove('slideout-left');
      build.parentNode.removeChild(build);
    }, 500);
  };

  this.next = function() {
    SP.assist.close();
    if(typeof action === 'function') action();
  };

  this.shake = function() {
    build.classList.add('shake');
    setTimeout(function () {
      build.classList.remove('shake');
    }, 300);
  }

  var btn = document.createElement('div');
  btn.classList.add('text-assist-button', 'noselect');
  btn.textContent = 'OK';
  btn.onclick = this.next;

  build.appendChild(btn)

  document.body.appendChild(build);
  build.style.top = elemBounds.height / 2 + elemBounds.top - (build.clientHeight / 2) + 'px';
  build.style.right = elemBounds.right + 16 + 'px';

  window.addEventListener('resize', () => {
    var elemBounds = elem.getBoundingClientRect();

    build.style.top = (elemBounds.height/2 + elemBounds.top - (build.clientHeight/2)) + 'px';
    build.style.right = elemBounds.right + 16 + 'px';
  });
}
var assist1 = () => new TextAssist(
  'Hver søyle er en liste. Søylenes høyde illustrerer hvor mye listens svar stemmer med dine.',
  document.getElementById('graph'),
  assist2
);
var assist2 = () => new TextAssist(
  'Når du har gått gjennom alle standpunktene får du en oversikt over partiene som er mest enig med deg',
  document.getElementsByClassName('valgomat-buttons')[0],
);
*/
// ########################################
// ########################################
// ########################################
// ########################################

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
