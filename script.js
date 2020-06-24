'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  let elem;

  const DomElement = function(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
  };
  
DomElement.prototype.createElement = function() {
  let elem = document.createElement('div');
  elem.style.cssText = `height: ${this.height}; 
      width: ${this.width}; 
      background-color: ${this.bg}; 
      font-size: ${this.fontSize};
      position: ${this.position}; `;
   
  document.body.append(elem);
};
 
const element = new DomElement('div', '100px', '100px', 'red', '1rem', 'absolute');
element.createElement();



function moveElement(e){
  let element = document.getElementsByTagName('div')[0];
  let cs = window.getComputedStyle(element);
  let left = parseInt(cs.marginLeft);
  let top = parseInt(cs.marginTop);
   
  switch(e.keyCode){
       
      case 37:  // если нажата клавиша влево
          if ( left  >0 ) {
              element.style.marginLeft = left - 10 + 'px';
            }
          break;
      case 38:   // если нажата клавиша вверх
          if ( top > 0 ) {
              element.style.marginTop = top - 10 + 'px';
            }
          break;
      case 39:   // если нажата клавиша вправо
          if (left < document.documentElement.clientWidth - 100 ) {
              element.style.marginLeft = left + 10 + 'px';
            }
          break;
      case 40:   // если нажата клавиша вниз
          if ( top < document.documentElement.clientHeight - 100 ) {
              element.style.marginTop = top + 10 + 'px';
            }
          break;
  }
}
console.log(element)
addEventListener('keydown', moveElement);
});
