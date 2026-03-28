import 'core-js/stable';
import 'regenerator-runtime/runtime';

const container = document.querySelector('.maisProdutos');
const templateSelect = document.querySelector('#templateSelect');
const addCampo = document.querySelector('#addCampo');

addCampo.addEventListener('click', () => {
    const htmlDoTemplate = templateSelect.innerHTML;
    container.insertAdjacentHTML('beforeend', htmlDoTemplate);
})