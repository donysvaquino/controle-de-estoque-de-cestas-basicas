const Cesta = require('../models/CestaModel');

exports.index = async (req, res) => {
    const cestas = await Cesta.buscaCestas();
    res.render('index', { cestas });
};
