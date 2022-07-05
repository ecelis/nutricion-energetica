'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('MealTypes', [
    {
      description_en: 'Breakfast',
      descripcion_es: 'Desayuno',
      ico: '0x1F373'
    },
    {
      description_en: 'Brunch',
      descripcion_es: 'Brunch',
      ico: '0x1F347'
    },
    {
      description_en: 'Lunch',
      descripcion_es: 'Comida',
      ico: '0x1F35B'
    },
    {
      description_en: 'Tea',
      descripcion_es: 'Merienda',
      ico: '0x1F968'
    },
    {
      description_en: 'Dinner',
      descripcion_es: 'Cena',
      ico: '0x1F96A'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MealTypes')
  }
};
