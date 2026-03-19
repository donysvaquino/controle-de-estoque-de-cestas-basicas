const mongoose = require('mongoose');
const descricoes = require('../includes/modelosCestas')

const cestaSchema = new mongoose.Schema ( {
    tipo: {type: String, required: true},
    quantidade: {type: Number, required: true},
    descricao: {type: String, required: true},
    ultimaAtualizacao: { type: Date, default: Date.now }
});

const CestaModel = mongoose.model('Cesta', cestaSchema);

class Cesta {
    constructor (body) {
        this.body = body;
        this.errors = [];
        this.cesta = null;
    }
    

    async registrar() {
        this.valida();
        if (this.errors.length > 0) return;

        const descricaoPadrao = descricoes[this.body.tipo] || "Descrição não definida";
        this.cesta = await CestaModel.findOneAndUpdate (
            { tipo: this.body.tipo },
            { $inc: { quantidade: this.body.quantidade },
              $set: { descricao: descricaoPadrao, ultimaAtualizacao: Date.now() }
            }, 
            { upsert: true, new: true }
        );  
    }

    valida() {
        this.cleanUp();
        if (!this.body.tipo) this.errors.push('Você precisa informar qual o tipo da cesta.');
        if (this.body.quantidade < 1) this.errors.push('Você precisa enviar no mínimo 1 cesta');
    }

    cleanUp () {
        for (const key in this.body) {
            if (key === 'quantidade') {
                this.body[key] = parseInt(this.body[key]) || 0;
            } else {
                if (typeof this.body[key] !== 'string') {
                    this.body[key] = '';
                }
            }
        }
    }
}

Cesta.buscaCestas = async () => {   
    const cestas = await CestaModel.find().sort({ ultimaAtualizacao: -1 });
    return cestas;
}
module.exports = Cesta;
