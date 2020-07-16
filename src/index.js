'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import btnDown from './modules/btnDown';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import myTeam from './modules/myTeam';
import calculator from './modules/calculator';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validate from './modules/validate';

//Timer
countTimer('20 july 2020');
//Menu
toggleMenu();
// переход на другой слайд
btnDown();
//popup
togglePopUp();
//Tabs
tabs();
//Slider
slider();
//Team
myTeam();
//Calculate
calculator();
calc(100);
//send-ajax-form
sendForm();
//Validation
validate();
