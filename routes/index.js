const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/informacion', (req, res) => {
    res.render('guia');
});

router.get('/contacto', (req, res) => {
    res.render('contacto');
});

module.exports = router;