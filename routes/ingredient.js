const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async function(req, res, next) {
    const { Ingredient } = db.sequelize.models;
    const data = req.body;
    const ingredient = await Ingredient.create(data);
    res.send(ingredient);
});

module.exports = router;
