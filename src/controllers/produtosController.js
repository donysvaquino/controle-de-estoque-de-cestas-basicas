const Produto = require('../models/ProdutoModel')

exports.listar = async function (req, res) {
    const produtos = await Produto.buscaProdutos();
    res.render('listarProdutos', { produtos });
}

exports.cadastrar = async function (req, res) {
    res.render('cadastrarProdutos');
}

exports.registrar = async (req, res) => {
   try { 
        const produto = new Produto(req.body);
        await produto.registrar();

        if (produto.errors.length > 0) {
            req.flash('errors', produto.errors);
            req.session.save(() => res.redirect('/cadastrar/produtos'));
            return;        
        }

        req.flash('success', 'Produto cadastrado com sucesso.');
        req.session.save(() => res.redirect(`/cadastrar/produtos`));
        return;
    } catch (e) {
        console.log(e);     
        res.render('404');    
    }
}
