export default function CestaPadrao() {
    const paginaCerta = document.querySelector('#pagina-cesta-padrao');
    if (!paginaCerta) return; // Se não estiver nessa página, para a execução aqui.

    const container = document.querySelector('.maisProdutos');
    const templateSelect = document.querySelector('#templateSelect');
    const addCampo = document.querySelector('#addCampo');

    addCampo.addEventListener('click', () => {
        const htmlDoTemplate = templateSelect.innerHTML;
        container.insertAdjacentHTML('beforeend', htmlDoTemplate);
    });

    const form = document.querySelector('form');

    const produtosAdicionados = [];
    
    const salvarNoLocalStorage = () => {
        const inputNomeDaCesta = form.querySelector('input[name="nomeDaCesta"]');
        const todosSelects = form.querySelectorAll('select[name="opcoes"]');
        const todasQtds = form.querySelectorAll('input[name="quantidade"]');
        
        const produtosAtuais = Array.from(todosSelects).map((select, i) => {
            return {
                produto: select.options[select.selectedIndex].text,
                quantidade: todasQtds[i].value || 0 
            }
        });

        const estadoAtual = {
            nomeCesta: inputNomeDaCesta.value,
            produtos: produtosAtuais
        };

        localStorage.setItem('cestaTemporaria', JSON.stringify(estadoAtual));
        console.log('Dados sincronizados:', estadoAtual);
    };

    form.addEventListener('input', (e) => {
        salvarNoLocalStorage();
    });

    form.addEventListener('change', () => {
        salvarNoLocalStorage();
    });

    const carregarDadosSalvos = () => {
        const dadosRaw = localStorage.getItem('cestaTemporaria');
        if (!dadosRaw) return;

        const dados = JSON.parse(dadosRaw);

        if (dados.nomeCesta) {
            const inputNomeDaCesta = form.querySelector('input[name="nomeDaCesta"]');
            if (inputNomeDaCesta) inputNomeDaCesta.value = dados.nomeCesta;
        }

        if (!dados.produtos) return;

        const inputsIniciais = form.querySelectorAll('select[name="opcoes"]').length;

        if (dados.length > inputsIniciais) {
            const quantosCriar = dados.length - inputsIniciais;
            for (let i = 0; i < quantosCriar; i++) {
                const htmlDoTemplate = templateSelect.innerHTML;
                container.insertAdjacentHTML('beforeend', htmlDoTemplate);
            }
        }

        const todosSelects = form.querySelectorAll('select[name="opcoes"]');
        const todasQtds = form.querySelectorAll('input[name="quantidade"]');

        dados.produtos.forEach((item, i) => {
            if (todosSelects[i]) {
                const options = Array.from(todosSelects[i].options);
                const indexOpcao = options.findIndex(opt => opt.text === item.produto);
                
                if (indexOpcao !== -1) {
                    todosSelects[i].selectedIndex = indexOpcao;
                }
            }

            if (todasQtds[i]) {
                todasQtds[i].value = item.quantidade;
            }
        });
    };

    carregarDadosSalvos();
}