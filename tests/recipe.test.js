const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Recipe, Menu } = db.sequelize.models;

describe('Test Recipe', () => {
    test('CREATE Recipe', async () => {
        const recipe = await Recipe.create({
            title: 'Scrambled eggs',
            ingredients: 'tomate\ncebolla\najo',
            instructions: 'Paso 1\nPaso2\nPaso 3',
            mealType: '1,2,4'
        });
        expect(recipe.title).toBe('Scrambled eggs');
        expect(recipe.mealType).toBe('1,2,4');
    });
    test('ADD recipe to menu', async () => {
        const menu = await Menu.create({
            title: 'Dia 4',
            date: new Date('2022-06-19')
        });
        const recipe = await Recipe.create({
            title: 'Scrambled eggs',
            ingredients: 'tomate\ncebolla\najo yay',
            instructions: 'Paso 1\nPaso2\nPaso 3',
            mealType: '1,2,4'
        });
        await menu.addRecipe(recipe);
        const result = await menu.hasRecipe(recipe);
        expect(result).toBe(true);
    });
});
