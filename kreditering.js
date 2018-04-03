'use strict'
function Credit(persons) {
  // constructor
  var build = document.createDocumentFragment();

  persons
    .map(this.toHTML)
    .forEach(el => {
      build.appendChild(el);
    });

  // exposed vars
  this.build = build;
}

Credit.prototype.toHTML = function(person) {
  let div = document.createElement('a');
  div.classList.add('credit-person-wrap');
  div.href =  'mailto:' + person.email + '?Subject=Om%20Studvests%20valgomat';

  let img = document.createElement('img');
  img.classList.add('credit-portrait');
  img.src = person.img;

  let name = document.createElement('p');
  name.classList.add('credit-name', 'byline-text');
  name.textContent = person.name;

  let role = document.createElement('p');
  role.classList.add('credit-role', 'byline-text');
  role.textContent = person.role;

  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(role);

  return div;
}
