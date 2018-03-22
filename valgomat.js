// VARIABLES
var SP = {};
SP.partier = ['va','sd','rl','il','ll','kd','bl'];
SP.fullname = {
  va: 'Venstrealliansen',
  sd: 'Sosialdemokratisk liste',
  rl: 'Realistlista',
  il: 'Internasjonal liste',
  ll: 'Liberal liste',
  kd: 'Kristendemokratisk l iste',
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


// ONLOAD
window.onload = async function() {
  try {
    loadCSV();
  } catch (e) {
    console.log(e);
  }
  drawParties();
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
