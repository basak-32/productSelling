const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user');
// const { getAllUsers } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

// PARAM
router.param('userId', getUserById);

// ROUTES
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

// router.get('/users', getAllUsers);

router.put(
  '/user/:userId',
  [check('email', 'proper email is required!').isEmail()],
  isSignedIn,
  isAuthenticated,
  updateUser
);

router.get('/carts/user/:userId', isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;