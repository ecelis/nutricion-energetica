const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const passportOpts = require('../config/settings');
const mealtype = require('../models/mealtype');

router.post('/', passport.authenticate('magiclogin', passportOpts ),
    async function(req, res, next) {
        const { Ingredient, MealType, Recipe } = db.sequelize.models;
        const data = req.body;
        try {
            const recipe = await Recipe.create(data);
            let response = recipe;
            const mealTypes = await MealType.findAll({ where: {
                id: data.mealType.split(',')
            }});
            await recipe.addMealTypes(mealTypes)
            if (data.ingredients) {
                const ingredients = await Ingredient.findAll({ where: { id: data.ingredients }});
                await recipe.addIngredients(ingredients);
                response = {
                    ...recipe.dataValues,
                    ingredients: await recipe.getIngredients()
                };
            }
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).send({error: "Can't save the new recipe"});
        }
    }
);


router.get('/mealtype/:id', passport.authenticate('magiclogin', passportOpts),
    async function(req, res, next) {
        const { Recipe, MealType } = db.sequelize.models;
        const {id} = req.params;
        try {
            const mealtypes = await MealType.findAll({
                where: {id: id.split(',').map(n => parseInt(n))},
                include: Recipe
            });
            
            res.send(mealtypes);
        } catch (error)  {
            console.log(error);
            res.status(500).send({error: "Can't get recipes for meal types"});
        }
        
    }
);

module.exports = router;
