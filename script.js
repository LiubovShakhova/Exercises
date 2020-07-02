'use strict';
let startBtn = document.getElementById('startBtn'),
  resetBtn = document.getElementById('resetBtn'),
  rund = document.getElementById('div'),
  count = 0,
  goRight,
  position = true;

let animate = () => {
  goRight = requestAnimationFrame(animate);
    count++;
    if (count < 291) {
        rund.style.left = count * 2 + 'px';
    } else {
        cancelAnimationFrame(goRight);
    }
};
startBtn.addEventListener('click', () => {
  if (position) {
    goRight = requestAnimationFrame(animate);
    position = false;
  } else {
    cancelAnimationFrame(goRight);
    position = true;
  }
 
});

resetBtn.addEventListener('click', (event) => {
  rund.style.left = 0 + 'px';
  count = 0;
  cancelAnimationFrame(goRight);
}); 
