const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Ingredient, Recipe } = db.sequelize.models;

describe('Test Ingredient', () => {
    test('CREATE Ingredient', async () => {
        await Ingredient.create({
            description_en: 'Coriander',
            descripcion_es: 'Cilantro',
            ndbn: 1006
        });
        const result = await Ingredient.findOne({ where: { description_en: 'Coriander'} });
        expect(result.description_en).toBe('Coriander');
    });
    test('ADD ingredient to recipe', async () => {
        const ingredient = await Ingredient.create({
            description_en: 'Garlic',
            descripcion_es: 'Ajo',
            ndbn: 1005
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

describe('API Ingredient', () => {
    test('POST Ingredient', () => {
        return request(app)
            .post('/ingredient')
            .send({
                description_en: 'Cheese',
                descripcion_es: 'Queso',
                ndbn: 1001
            })
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
});
