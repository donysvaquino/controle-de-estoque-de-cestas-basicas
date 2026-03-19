const Cesta = require('../models/CestaModel')

exports.index = function (req, res) {
    res.render('cesta');
}

exports.registrar = async (req, res) => {
   try { 
        const cesta = new Cesta(req.body);
        await cesta.registrar();

        if (cesta.errors.length > 0) {
            req.flash('errors', cesta.errors);
            req.session.save(() => res.redirect('/cesta'));
            return;        
        }

        req.flash('success', 'Cesta adicionada com sucesso.');
        req.session.save(() => res.redirect(`/cesta`));
        return;
    } catch (e) {
        console.log(e);     
        res.render('404');    
    }
}
