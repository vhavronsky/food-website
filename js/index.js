import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
// npx json-server --watch db.json

window.addEventListener('DOMContentLoaded', () => {

    tabs();
    modal();
    timer();
    cards();
    calculator();
    forms();
    slider();

})
