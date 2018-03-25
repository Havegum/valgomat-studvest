"use strict";

// VARIABLES
var SP = {
  partier: ['va','sd','rl','il','ll','kd','bl'],

  fullname: {
    va: 'Venstrealliansen',
    sd: 'Sosialdemokratisk liste',
    rl: 'Realistlista',
    il: 'Internasjonal liste',
    ll: 'Liberal liste',
    kd: 'Kristendemokratisk liste',
    bl: 'Blå liste'
  },

  partyResponses: {
    va: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sd: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rl: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    il: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ll: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    kd: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bl: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  userResponse: [],

  panels: []

};

SP.question = [
  {
    text: "Det bør være kjønnskvotering til enkelte studielinjer.",
    case: ""
  },
  {
    text:"Kantinedriften på campus bør konkurranseutsettes.",
    case:""
  },
  {
    text:"Akademika bør ikke ha monopol på pensumsalg på campus.",
    case:""
  },
  {
    text:"Som student bør man selv få velge hvilken form for eksamen man skal ha.",
    case:""
  },
  {
    text:"Det bør være eksamensfri 18. mai.",
    case:""
  },
  {
    text:"Det var riktig å endre Sammens helsefond slik at refusjon til psykologtimer prioriteres fremfor legetimer.",
    case:""
  },
  {
    text:"UiBs Meltzerfond bør stoppe å investere i Kongsberggruppen og oljeselskaper.",
    case:""
  },
  {
    text:"UiBs systemer for varsling av seksuell trakassering fungerer godt nok slik de er i dag.",
    case:""
  },
  {
    text:"Inntektsgrensen for å få studiestøtte bør heves.",
    case:""
  },
  {
    text:"Inntektsgrensen for å få studiestøtte bør senkes.",
    case:""
  },
  {
    text:"UiB bør legge til rette for mer religiøs aktivitet.",
    case:""
  },
  {
    text:"Det bør være obligatorisk lyd- og videoopptak fra alle forelesninger ved UiB.",
    case:""
  },
  {
    text:"Studiestøtten bør heves.",
    case:""
  },
  {
    text:"Det bør være taco i kantinen hver fredag.",
    case:""
  },
  {
    text:"Kantinen bør ha flere kjøttfrie dager.",
    case:""
  },
  {
    text:"Det bør være gratis pensum for studenter.",
    case:""
  },
  {
    text:"Det bør være en form for kaffeutsalg på alle lesesaler og biblioteker.",
    case:""
  },
  {
    text:"UiB bør øke semesteravgiften.",
    case:""
  },
  {
    text:"Det bør legges mer vekt på alkoholfrie arrangementer i fadderuken.",
    case:""
  },
  {
    text:"Lesesaler og/eller biblioteker bør være døgnåpne.",
    case:""
  },
  {
    text:"Man bør få obligatorisk tilbakemelding på eksamenssensur?",
    case:""
  },
  {
    text:"UiB legger for dårlig til rette til å inkludere internasjonale studenter?",
    case:""
  },
  {
    text:"Det bør innføres et «hooke-forbud» (innebærer både sex og klining) for faddere mot fadderbarn.",
    case:""
  }
]

SP.length = 15;
SP.currentQuestion = 7;

var a;
// ONLOAD
window.onload = async function() {
  try {
    loadCSV();
  } catch (e) {
    console.error(e);
  }
  drawParties();
  a = new Panel(0);
  a.display();
};

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

function Panel(questionNum) {
  var panel = document.createElement('div');
  panel.classList.add('valgomat-full');
  panel.style.zIndex = 10 + questionNum;

  // Progress bar
  var progress = new this.Progress(questionNum);
  panel.appendChild(progress.build);

  // Inner (Question + BTNS)
  var question = SP.question[questionNum].text;
  var inner = new this.Inner(question, this);
  panel.appendChild(inner.build);

  // Navbar
  var navbar = new this.Navbar();
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

  // Store globally
  SP.panels[questionNum] = this;
}

// Progress constructor
Panel.prototype.Progress = function(n) {
  var build = document.createElement('div');
  build.classList.add('progress');
  build.id = 'progress';

  var pText = document.createElement('div');
  pText.classList.add('progress-text');
  pText.id = 'progress-text';

  var text = document.createElement('p');
  text.textContent = 'Spørsmål ' + (n + 1);

  var totalQuestions = document.createElement('span');
  totalQuestions.textContent = ' / ' + (SP.length);

  text.appendChild(totalQuestions);
  pText.appendChild(text);

  build.appendChild(pText);

  var pBarBG = document.createElement('div');
  pBarBG.classList.add('progress-bar-background');
  build.appendChild(pBarBG);

  var pBarFill = document.createElement('div');
  pBarFill.classList.add('progress-bar-fill');
  pBarFill.id = 'progress-bar-fill';
  pBarFill.style.width = 'calc(' + (n / SP.length * 100) + '% + .8em)';
  build.appendChild(pBarFill);

  var pBarMarkers = document.createElement('div');
  pBarMarkers.classList.add('progress-bar-markers');
  pBarMarkers.id = 'progress-bar-markers';
  for(let i = 0; i < SP.length; i++) {
    let marker = document.createElement('div');
    marker.classList.add('progress-' + (i <= n ? 'active' : 'inactive'));
    pBarMarkers.appendChild(marker);
  }
  build.appendChild(pBarMarkers);

  // Obj = { HTMLNODE };

  this.build = build;
}

// Inner constructor
Panel.prototype.Inner = function(question, panel) {
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

  btns.appendChild(new panel.PollButton(0, panel).build);
  btns.appendChild(new panel.PollButton(1, panel).build);
  btns.appendChild(new panel.PollButton(2, panel).build);

  build.appendChild(btns);

  this.build = build;
}

// PollButton constructor
Panel.prototype.PollButton = function(n, panel) {
  var build = document.createElement('div');
  build.classList.add('poll');
  build.onclick = function() { check(this, panel) };

  var graphic = document.createElement('div');
  graphic.classList.add('poll-inactive');
  build.appendChild(graphic);

  var text = document.createElement('p');
  switch (n) {
    case 0: text.textContent = 'Uenig';   break;
    case 1: text.textContent = 'Nøytral'; break;
    case 2: text.textContent = 'Enig';    break;
  }
  build.appendChild(text);

  this.build = build;
}

// Navbar constructor
Panel.prototype.Navbar = function(forwardDisabled, panel) {
  var forwardDisabled = forwardDisabled || true;
  var build = document.createElement('div');
  build.classList.add('valgomat-navbar');

  var backBtn = document.createElement('div');
  backBtn.classList.add('navbtn-left', 'noselect');
  build.appendChild(backBtn);

  var forwardBtn = document.createElement('div');
  forwardBtn.classList.add('navbtn-right', 'noselect');
  if(forwardDisabled) {
    forwardBtn.classList.add('navbtn-right-disabled');
  }
  build.appendChild(forwardBtn);

  this.build = build;
  this.forward = forwardBtn;
}

// Case constructor
Panel.prototype.CaseBlurb = function(text) {
  var text = text || 'Vel, saken er at vi har mistet filen som forklarer hva saken handler om ... Veldig pinlig :(';
  var build = document.createElement('div');
  build.classList.add('case-blurb');

  var blurbInner = document.createElement('p');
  blurbInner.textContent = text;
  build.appendChild(blurbInner);

  this.build = build;
}

Panel.prototype.store = function (questionNum, response) {
  SP.userResponse[questionNum] = response;
};

Panel.prototype.display = function (fromLeft) {
  document.getElementById('valgomat').appendChild(this.panel);
  this.slidein(fromLeft);
};

Panel.prototype.slidein = function (fromLeft) {
  var slideclass = 'slidein-' + (fromLeft ? 'left':'right');

  this.panel.classList.add(slideclass);
  setTimeout(() => {
    this.panel.classList.remove(slideclass);
  }, 500);
};

Panel.prototype.slideout = function (toRight) {
  var slideclass = 'slideout-' + (toRight ? 'right':'left');
  this.panel.classList.add(slideclass);
  setTimeout(() => {
    this.panel.classList.remove(slideclass);
    this.panel.parentNode.removeChild(this.panel);
  }, 500);
};

Panel.prototype.next = function () {
  if(SP.panels[this.questionNum + 1] === undefined) {
    var nextPanel = new Panel(this.questionNum + 1);
  } else {
    var nextPanel = SP.panels[this.questionNum + 1];
  }

  this.store();
  this.slideout();

  nextPanel.display();

  return nextPanel;
};

Panel.prototype.prev = function () {
  if(this.questionNum === 0) return this;

  this.store();
  this.slideout(true);

  var prevPanel = SP.panels[this.questionNum - 1];

  prevPanel.display(true);

  return prevPanel;
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
