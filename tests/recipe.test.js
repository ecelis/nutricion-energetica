const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Recipe, Menu, Ingredient } = db.sequelize.models;

describe('Test Recipe', () => {
    test('CREATE Recipe', async () => {
        const recipe = await Recipe.create({
            title: 'Scrambled eggs',
            instructions: 'Paso 1\nPaso2\nPaso 3',
            mealType: '1,2,4'
        });
        expect(recipe.title).toBe('Scrambled eggs');
        expect(recipe.mealType).toBe('1,2,4');
    });
    test('ADD recipe to menu', async () => {
        const menu = await Menu.create({
            title: 'Recipe Test Menu',
            date: new Date('2022-06-19')
        });
        const recipe = await Recipe.create({
            title: 'Hot Cakes',
            instructions: 'Paso 1\nPaso2\nPaso 3',
            mealType: '2'
        });
        await menu.addRecipe(recipe);
        const result = await menu.hasRecipe(recipe);
        expect(result).toBe(true);
    });
});

describe('API Recipe', () => {
    beforeAll(async () => {
        const ingredient = await Ingredient.bulkCreate([
            { description_en: 'Flour', descripcion_es: 'Harina', ndbn: 1007 },
            { description_en: 'Honey', descripcion_es: 'Miel', ndbn: 1008 },
            { description_en: 'Sugar', descripcion_es: 'Azucar', ndbn: 1009 }
        ]);
    });
    test('POST Recipe', () => {
        return request(app)
            .post('/recipe')
            .send({
                title: 'POST Recipe',
                instructions: 'Paso 1\nPaso2\nPaso 3',
                mealType: '2,4'
            })
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
    test('POST Recipe with ingredients', () => {
        return request(app)
            .post('/recipe')
            .send({
                title: 'POST Recipe and ingredients',
                instructions: 'Paso 1\nPaso2\nPaso 3',
                mealType: '1,2,4',
                ingredients: [1,2,3]
            })
            .set('Accept', 'application/json')
            .then(async (res) => {
                const json = JSON.parse(res.text);
                expect(json.title).toBe('POST Recipe and ingredients');
                expect(json.ingredients.length).toBe(3);
            });
    });
});

