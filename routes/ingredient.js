const express = require('express');
const { Op } = require('sequelize');
const passport = require('passport');
const db = require('../models');
const passportOpts = require('../config/settings');

const router = express.Router();

// Ingredients
router.post('/', passport.authenticate('magiclogin', passportOpts),
    async function(req, res, next) {
      const { Ingredient } = db.sequelize.models;
      const {body} = req;
      const data = await Ingredient.create(body);
      res.send(data);
    }
);

router.get('/', passport.authenticate('magiclogin', passportOpts),
  async function(req, res, next) {
    const { Ingredient } = db.sequelize.models;
    const data = await Ingredient.findAll({
      limit: 10
    });
    res.send(data);
  }
);

router.get('/:id',
  async function(req, res, next) {
    const {id} = req.params;
    const ids = id.split(',');
    const { Ingredient } = db.sequelize.models;
    const data = await Ingredient.findAll({
      where: {id: ids}
    });
    res.send(data);
  }
);

// Category
router.post('/category', passport.authenticate('magiclogin', passportOpts),
  async function(req, res, next) {
    const { Category } = db.sequelize.models;
    const {body} = req;
    const data = await Category.create(body);
    res.send(data);
  }
);

router.get('/category', passport.authenticate('magiclogin', passportOpts),
  async function(req, res, next) {
    const { Category } = db.sequelize.models;
    const data = await Category.findAll({
      limit: 10
    });
    res.send(data);
  }
);

router.get('/category/:id', passport.authenticate('magiclogin', passportOpts),
  async function(req, res, next) {
    const { Category } = db.sequelize.models;
    const {id} = req.params;
    const ids = id.split(',');
    const data = await Category.findAll({
      where: {id: ids}
    });
    res.send(data);
  }
);

module.exports = router;
