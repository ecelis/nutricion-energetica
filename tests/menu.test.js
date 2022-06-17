const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Menu, User } = db.sequelize.models;

describe('Test Menu', () => {
    beforeAll(async () => {
        try {
            const coach = await User.create({
                email: 'coach@example.com',
                displayName: 'Super coach',
                active: true,
                coach: true
            });
            const trainee = await User.create({
                email: 'trainee@example.com',
                displayName: 'Pie Tierno',
                active: true,
                coach: false
            });
            return {coach: coach, trainee: trainee };
        } catch (error) {
            console.log(error)
        }
    });
    test('CREATE Menu', async () => {
        try {
            const menu = await Menu.create({
                title: 'Dia 4',
                date: new Date('2022-06-19')
            });
            expect(menu.title).toBe('Dia 4');
        } catch (error) { console.log(error) }
    });
    test('ADD Menu to User', async () => {
        try {
            const user = await User.findAll({ where: { email: 'coach@example.com' }});
        
            const menu = await Menu.create({
                title: 'Dia 4',
                date: new Date('2022-06-19')
            });
            await menu.addUser(user);
            expect(menu.title).toBe('Dia 4');
        } catch (error) { console.log(error) }
    });
    test('READ Menu from Coach', async () => {
        try {
            const user = await User.findOne({ where: { email: 'coach@example.com' } });
            const menu = await user.getMenus();
            expect(menu[0].dataValues.title).toBe('Dia 4');
        } catch (error) { console.log(error) }
    });
});
