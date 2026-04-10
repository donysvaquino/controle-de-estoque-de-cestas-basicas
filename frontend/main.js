import { get } from 'core-js/core/dict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const container = document.querySelector('.maisProdutos');
const templateSelect = document.querySelector('#templateSelect');
const addCampo = document.querySelector('#addCampo');

addCampo.addEventListener('click', () => {
    const htmlDoTemplate = templateSelect.innerHTML;
    container.insertAdjacentHTML('beforeend', htmlDoTemplate);
});

const qtdInput = document.querySelectorAll('.qtdInput');

qtdInput.forEach((e, index) => {
    e.addEventListener('keyup', event => {
        localStorage.setItem(`Input${index}`, `${event.target.value}`);
    });    
});

window.addEventListener('load', () => {
    qtdInput.forEach((e, index) => {
        qtdInput[index].value = localStorage.getItem(`Input${index}`); 
    });
});


