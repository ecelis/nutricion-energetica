const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');

router.post('/', passport.authenticate('magiclogin', { session: false }),
    async function(req, res, next) {
      const { Ingredient } = db.sequelize.models;
      const data = req.body;
      const ingredient = await Ingredient.create(data);
      res.send(ingredient);
    }
);

router.post('/category', async function(req, res, next) {
    const { Category } = db.sequelize.models;
    const data = req.body;
    const category = await Category.create(data);
    res.send(category);
});

module.exports = router;
