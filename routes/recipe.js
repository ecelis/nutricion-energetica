const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async function(req, res, next) {
    const { Ingredient, Recipe } = db.sequelize.models;
    const data = req.body;
    const recipe = await Recipe.create(data);
    let response = recipe;
    if (data.ingredients) {
        const ingredients = await Ingredient.findAll({ where: { id: data.ingredients }});
        await recipe.addIngredients(ingredients);
        response = {
            ...recipe.dataValues,
            ingredients: await recipe.getIngredients()
        };
    }
    res.send(response);
});

module.exports = router;
