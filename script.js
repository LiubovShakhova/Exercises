'use strict';
let elem;
const DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};
DomElement.prototype.createElement = function() {
  let elem = document.createElement('div');
  elem.textContent = prompt('what?', '.something');
  
  if (elem.textContent[0] === '#') {
    elem = document.createElement('p');
    elem.id = elem.textContent.slice(1);
    document.body.append(elem);
  } else if (elem.textContent[0] === '.') {
    elem.className = elem.textContent.slice(1);
    document.body.append(elem);
  }

  elem.style.cssText = `height: ${this.height}; 
      width: ${this.width}; 
      background-color: ${this.bg}; 
      font-size: ${this.fontSize}; `;
   
};
const element = new DomElement(elem, '100px', '100px', 'red', '1rem');

element.createElement();
