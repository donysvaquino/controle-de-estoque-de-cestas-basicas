export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        console.log('Formulário encontrado:', this.form);
    }

    verificar() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();  
            this.validate(e)
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        error = true;
        
        this.validaEmail();
        this.validaSenha();
    }

    validaEmail(email) {
        if (!validator.isEmail(email)) {
            alert ('E-mail Inválido');
        }
    }

    validaSenha(senha) {
        if (senha.length < 3 || senha.length > 50) {
            alert('Senha inválida');
        }
    }
}