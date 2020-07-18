'use strict';
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'es6-promise';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'element-remove-polyfill';
import 'whatwg-fetch';
import smoothscrollPolyfill from 'smoothscroll-polyfill';
import 'scroll-behavior-polyfill';
smoothscrollPolyfill.polyfill();

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
