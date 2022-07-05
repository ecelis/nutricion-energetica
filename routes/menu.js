const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');

router.post('/menu', { session: false },
    async function(req, res, next) {
        console.log(req.data)
        res.send(req.data)
    }
);

module.exports = router;