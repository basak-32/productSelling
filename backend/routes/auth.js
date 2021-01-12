const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const { signup, signin, signout, isSignedIn } = require('../controllers/auth');

router.post('/signup', [
  check('firstName', 'First Name is required').isLength({ min: 1 }),
  check('email', 'proper email is required').isEmail(),
  check('password', 'password must be of length 5 or more').isLength({ min: 5 })
], signup);

router.post('/signin', [
  check('email', 'proper email is required').isEmail(),
  check('password', 'password is required').isLength({ min: 1 })
], signin);

router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;