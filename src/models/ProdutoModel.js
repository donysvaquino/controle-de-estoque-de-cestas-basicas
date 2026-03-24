const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema ( {
    nome: {type: String, required: true},
    quantidade: {type: Number, required: true},
    descricao: {type: String, required: true},
    ultimaAtualizacao: { type: Date, default: Date.now, get: v => v?.toLocaleString('pt-BR').slice(0, 17)  }    
}, { 
    toJSON: { getters: true },
    toObject: { getters: true } 
});

const options = {
    transform: (doc, ret) => {
        ret.ultimaAtualizacao = ret.ultimaAtualizacao?.toLocaleString('pt-BR').slice(0, 17);
        return ret;
    }
};

produtoSchema.set('toJSON', options);
produtoSchema.set('toObject', options);

const ProdutoModel = mongoose.model('Produto', produtoSchema);

class Produto {
    constructor (body) {
        this.body = body;
        this.errors = [];
        this.produto = null;
    }
    

    async registrar() {
        this.valida();
        if (this.errors.length > 0) return;

        this.body.produto = await ProdutoModel.findOneAndUpdate (
            { nome: this.body.nome, descricao: this.body.descricao},
            { $inc: { quantidade: this.body.quantidade },
              $set: { ultimaAtualizacao: Date.now() }
            }, 
            { upsert: true, new: true }
        );  
    }

    valida() {
        this.cleanUp();
        if (!this.body.nome) this.errors.push('Você precisa informar o nome do produto.');
        if (this.body.quantidade < 1) this.errors.push('Você precisa enviar no mínimo 1 produto');
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

Produto.buscaProdutos = async () => {   
    const produtos = await ProdutoModel.find().sort({ ultimaAtualizacao: -1 });
    return produtos;
}
module.exports = Produto;
