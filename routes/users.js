var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../models');

router.get('/', passport.authenticate('magiclogin', { session: false }),
  async function(req, res, next) {
    const { User } = db.sequelize.models;
    const users = await User.findAll();
    res.send(users); 
  });

  router.post('/', async function(req, res, next) {
    const { User } = db.sequelize.models;
    const data = req.body;
    const user = await User.create(data);
    res.send(user);
  }
);

module.exports = router;