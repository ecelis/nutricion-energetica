const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Ingredient, Recipe } = db.sequelize.models;

describe('Test Ingredient', () => {
    test('CREATE Ingredient', async () => {
        await Ingredient.create({
            name: 'Coriander'
        });
        const result = await Ingredient.findOne({ where: { name: 'Coriander'} });
        expect(result.name).toBe('Coriander');
    });
    test('ADD ingredient to recipe', async () => {
        const ingredient = await Ingredient.create({
            name: 'Garlic'
        });
        const recipe = await Recipe.create({
            title: 'Scrambled eggs',
            instructions: 'Paso 1\nPaso2\nPaso 3',
            mealType: '1,2,4'
        });
        await recipe.addIngredient(ingredient);
        const result = await recipe.hasIngredient(ingredient);
        expect(result).toBe(true);
    });
});
