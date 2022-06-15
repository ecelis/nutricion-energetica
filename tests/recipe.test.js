const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Recipe } = db.sequelize.models;

describe('Test Recipe', () => {
    test('CREATE Recipe', async () => {
        const r1 = await Recipe.create({
            title: 'Scrambled eggs',
            ingredients: 'tomate\ncebolla\najo',
            instructions: 'Paso 1\nPaso2\nPaso 3'
        });
        expect(r1.title).toBe('Scrambled eggs');
    });
});
