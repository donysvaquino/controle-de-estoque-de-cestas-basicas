const Cesta = require('../models/CestaModel')
const Produto = require('../models/ProdutoModel')

exports.index = async (req, res) => {
    const produtos = await Produto.buscaProdutos();
    res.render('cestaPadrao', { produtos });
}

exports.listar = async function (req, res) {
    const cestas = await Cesta.buscaCestas();
    res.render('listarCesta', { cestas });
}

exports.cadastrar = async function (req, res) {
    res.render('cadastrarCesta');
}

exports.registrar = async (req, res) => {
   try { 
        const cesta = new Cesta(req.body);
        await cesta.registrar();

        if (cesta.errors.length > 0) {
            req.flash('errors', cesta.errors);
            req.session.save(() => res.redirect('/cadastrar/cestas'));
            return;        
        }

        req.flash('success', 'Cesta adicionada com sucesso.');
        req.session.save(() => res.redirect(`/cadastrar/cestas`));
        return;
    } catch (e) {
        console.log(e);     
        res.render('404');    
    }
}
