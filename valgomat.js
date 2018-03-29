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
    case: ""
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
  drawParties();
  a = new QuestionPanel(0, true);
  a.display();
}, {once:true});

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

function Panel() {
  var panel = document.createElement('div');
  panel.classList.add('valgomat-full');
  this.panel = panel;
}

// Navbar constructor
Panel.prototype.Navbar = function(panel, forwardDisabled, noReturn) {
  var forwardDisabled = forwardDisabled || true;
  var build = document.createElement('div');
  build.classList.add('valgomat-navbar');

  if(!noReturn) {
    var backBtn = document.createElement('div');
    backBtn.classList.add('navbtn-left', 'noselect');
    build.appendChild(backBtn);
    backBtn.addEventListener('click', () => {
      if(panel.interactable) panel.jumpTo(panel.questionNum - 1);
    });
  }

  var forwardBtn = document.createElement('div');
  forwardBtn.classList.add('navbtn-right', 'noselect');
  if(forwardDisabled) {
    forwardBtn.classList.add('navbtn-right-disabled');
  }
  forwardBtn.addEventListener('click', () => {
    if(!forwardBtn.classList.contains('navbtn-right-disabled') && panel.interactable) {
      if(panel.interactable) panel.jumpTo(panel.questionNum + 1);
    }
  });
  build.appendChild(forwardBtn);

  this.build = build;
  this.forward = forwardBtn;
}

// Save data
Panel.prototype.store = function () {
  SP.userResponse[this.questionNum] = this.response;
};

// Place on screen
Panel.prototype.display = function (fromLeft) {
  document.getElementById('valgomat').appendChild(this.panel);
  this.slidein(fromLeft);
};

// Slide in from left or right
Panel.prototype.slidein = function (fromLeft) {
  this.interactable = false;
  var slideclass = 'slidein-' + (fromLeft ? 'left':'right');

  this.panel.classList.add(slideclass);
  setTimeout(() => {
    this.panel.classList.remove(slideclass);
    this.interactable = true;
  }, 500);
};

// Slide out to left or right
Panel.prototype.slideout = function (toRight) {
  this.interactable = false;
  var slideclass = 'slideout-' + (toRight ? 'right':'left');
  this.panel.classList.add(slideclass);
  setTimeout(() => {
    this.panel.classList.remove(slideclass);
    this.panel.parentNode.removeChild(this.panel);
    this.interactable = true;
  }, 500);
};

// jumpTo(n)
Panel.prototype.jumpTo = function(target) {
  if(target === this.questionNum) return this;
  var incomingPanel, slideLeft;

  switch (target) {
    case 'pri': target = SP.question.length; break;
    case 'score': target = SP.question.length + 1; break;
  }

  slideLeft = (target < this.questionNum);

  this.slideout(slideLeft);

  if (SP.panels[target]) {
    // If panel already exists, use that panel.
    incomingPanel = SP.panels[target];

  } else {
    // Otherwise, make a new appropriate panel
    switch (target) {
      case SP.question.length:
        console.log('drawing priorities');
        incomingPanel = new PrioritiesPanel();
        break;

      case SP.question.length + 1:
        incomingPanel = new ScorePanel();
        break;

      default:
        incomingPanel = new QuestionPanel(target);
    }
  }

  SP.currentPanel = target;
  incomingPanel.display(slideLeft)

  a = incomingPanel;
  return incomingPanel;
}

function QuestionPanel(questionNum, noReturn) {
  Panel.call(this); // Super

  var panel = this.panel;
  panel.style.zIndex = 10 + questionNum;

  // Progress bar
  var progress = new this.Progress(questionNum);
  panel.appendChild(progress.build);

  // Inner (Question + BTNS)
  var question = SP.question[questionNum].text;
  var inner = new this.Inner(question, this);
  panel.appendChild(inner.build);

  // Navbar
  var forwardDisabled = true; // REVIEW: Useless variable?
  var navbar = new this.Navbar(this, forwardDisabled, noReturn);
  panel.appendChild(navbar.build);

  var caseBlurb = new this.CaseBlurb();
  panel.appendChild(caseBlurb.build);

  // Exposed variables
  this.panel = panel;
  this.progress = progress;
  this.inner = inner;
  this.navbar = navbar;
  this.caseBlurb = caseBlurb;
  this.questionNum = questionNum;
  this.interactable = true;

  // Store globally
  SP.panels[questionNum] = this;
}
QuestionPanel.prototype = Object.create(Panel.prototype);

// Progress constructor
QuestionPanel.prototype.Progress = function(n) {
  var build = document.createElement('div');
  build.classList.add('progress');
  build.id = 'progress';

  var pText = document.createElement('div');
  pText.classList.add('progress-text');
  pText.id = 'progress-text';

  var text = document.createElement('p');
  text.textContent = 'Spørsmål ' + (n + 1);

  var totalQuestions = document.createElement('span');
  totalQuestions.textContent = ' / ' + (SP.question.length);

  pText.appendChild(text);
  pText.appendChild(totalQuestions);

  build.appendChild(pText);

  var pBarBG = document.createElement('div');
  pBarBG.classList.add('progress-bar-background');
  build.appendChild(pBarBG);

  var pBarFill = document.createElement('div');
  pBarFill.classList.add('progress-bar-fill');
  pBarFill.id = 'progress-bar-fill';
  pBarFill.style.width = (n / (SP.question.length-1) * 100) + '%';
  build.appendChild(pBarFill);

  var pBarMarkers = document.createElement('div');
  pBarMarkers.classList.add('progress-bar-markers');
  pBarMarkers.id = 'progress-bar-markers';

  for(let i = 0; i < SP.question.length; i++) {
    let marker = document.createElement('div');
    marker.classList.add('progress-' + (i <= n ? 'active' : 'inactive'));
    pBarMarkers.appendChild(marker);
  }

  build.appendChild(pBarMarkers);

  // Obj = { HTMLNODE };

  this.build = build;
}

// Inner constructor
QuestionPanel.prototype.Inner = function(question, panel) {
  var question = question || 'Mangler spørsmål ...';

  var build = document.createElement('div');
  build.classList.add('valgomat-inner');

  var q = document.createElement('div');
  q.classList.add('valgomat-question');

  var qTxt = document.createElement('p');
  qTxt.textContent = question;

  q.appendChild(qTxt);
  build.appendChild(q);


  var btns = document.createElement('div');
  btns.classList.add('valgomat-buttons');

  btns.appendChild(new panel.PollButton(2, panel).build);
  btns.appendChild(new panel.PollButton(1, panel).build);
  btns.appendChild(new panel.PollButton(0, panel).build);

  build.appendChild(btns);

  this.build = build;
}

// PollButton constructor
QuestionPanel.prototype.PollButton = function(n, panel) {
  var build = document.createElement('div');
  build.classList.add('poll');
  build.onclick = function() {
    panel.response = n;
    check(this, panel);
    panel.store();
    scoreAll();
  };

  var graphic = document.createElement('div');
  graphic.classList.add('poll-inactive');
  build.appendChild(graphic);

  var text = document.createElement('p');
  switch (n) {
    case 0: text.textContent = 'Uenig';   break;
    case 1: text.textContent = 'Nøytral'; break;
    case 2: text.textContent = 'Enig';    break;
  }
  text.classList.add('noselect')
  build.appendChild(text);

  this.build = build;
}

// Case constructor
QuestionPanel.prototype.CaseBlurb = function(text) {
  var text = text || 'Vel, saken er at vi har mistet filen som forklarer hva saken handler om ... Veldig pinlig :(';
  var build = document.createElement('div');
  build.classList.add('case-blurb');

  var blurbInner = document.createElement('p');
  blurbInner.textContent = text;
  build.appendChild(blurbInner);

  this.build = build;
}

function PrioritiesPanel() {
  Panel.call(this);
  this.questionNum = SP.question.length;
  var panel = this.panel;

  var header = document.createElement('h3');
  header.classList.add('priority-header');
  header.textContent = 'Hva er de viktigste sakene for deg?'
  panel.appendChild(header)

  var trackerWrap = document.createElement('div');
  trackerWrap.classList.add('progress-text', 'noselect');

  var tracker = document.createElement('p');
  tracker.textContent = 'Prioriteringer: 0';
  trackerWrap.appendChild(tracker);

  var totalPriorities = document.createElement('span');
  totalPriorities.textContent = ' / ' + 5;
  trackerWrap.appendChild(totalPriorities);

  panel.appendChild(trackerWrap);

  var priorityListWrapper = document.createElement('div');
  priorityListWrapper.classList.add('priority-slider-wrap');
  SP.question.forEach((q, i) => {
    let e = new this.PrioritySlider(q.shorthand, i, tracker, this);
    priorityListWrapper.appendChild(e.build);
  });
  panel.appendChild(priorityListWrapper);

  // Navbar
  var navbar = new this.Navbar(this, true, false);
  panel.appendChild(navbar.build);

  this.navbar = navbar;
}
PrioritiesPanel.prototype = Object.create(Panel.prototype);

PrioritiesPanel.prototype.PrioritySlider = function (q, i, tracker, panel) {
  var build = document.createElement('div');
  build.classList.add('priority-slider')

  var text = document.createElement('p');
  text.classList.add('priority-slider--shorthand', 'noselect');
  text.textContent = q;
  build.appendChild(text);

  build.addEventListener('click', () => {
    if(build.classList.contains('priority-slider-active')) {
      build.classList.remove('priority-slider-active');
      let j = SP.priorities.indexOf(i);
      if(j > -1) SP.priorities.splice(j, 1);

    } else {
      if(SP.priorities.length < 5) {
        build.classList.add('priority-slider-active');
        SP.priorities.push(i);
      }
    }

    tracker.textContent = 'Prioriteringer: ' + SP.priorities.length;

    if(SP.priorities.length >= 3) {
      panel.navbar.forward.classList.remove('navbtn-right-disabled');
    } else if(!panel.navbar.forward.classList.contains('navbtn-right-disabled')) {
      panel.navbar.forward.classList.add('navbtn-right-disabled');
    }

    scoreAll();
  });

  this.build = build;
};

function ScorePanel() {
  Panel.call(this);
  this.questionNum = SP.question.length + 1;
}
ScorePanel.prototype = Object.create(Panel.prototype);

function TextAssist(text, elem, leanRight) {
  var elemBounds = elem.getBoundingClientRect();

  var build = document.createElement('div');
  build.classList.add('text-assist-fullwrap');

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

  var btn = document.createElement('div');
  btn.classList.add('text-assist-button', 'noselect')
  btn.textContent = "OK";

  build.appendChild(btn)

  document.body.appendChild(build);
  build.style.top = elemBounds.height/2 + elemBounds.top - (build.clientHeight/2) + 'px';
  build.style.right = elemBounds.right + 16 + 'px';

  window.addEventListener('resize', () => {
    var elemBounds = elem.getBoundingClientRect();

    build.style.top = (elemBounds.height/2 + elemBounds.top - (build.clientHeight/2)) + 'px';
    build.style.right = elemBounds.right + 16 + 'px';
  });
}

var c = () => new TextAssist(
  'Hver søyle er en liste. Søylenes høyde illustrerer hvor mye listens svar stemmer med dine!',
  document.getElementById('graph'),
  false
);

// Global functions
function scoreAll(final) {
  SP.max = 0;
  var sortedParties = Object.keys(SP.partier)
    .map(scoreForParty) // Compare score to user response
    .map(scaleParty) // Scale party graph
    .slice()
    .sort(comparePartyScore) // Sort parties by size

  setTimeout(() => sortedParties.map((o, i) => relocateParty(o, i)), 250);

  if(final) return sortedParties.map((o) => o.party);
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
  o.elem.style.backgroundColor = (o.sum === SP.max) ? 'var(--main)' : ''; // Uncomment for colored leader
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
  for(let p in SP.partier) {
    let party = p;
    let fullname = SP.partier[p];

    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.id = party;
    bar.style.transform = barTranslateX(i);
    bar.style.height = '50%';
    // bar.style.opacity = 0.30 + (i*0.10); // Uncomment for greyscale color coding

    build.appendChild(bar);
    i++;
  }
  var div = document.getElementById('graph')
  div.classList.add('graph');
  div.appendChild(build);
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
