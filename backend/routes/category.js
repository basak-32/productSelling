const express = require('express');
const router = express.Router();

const { 
  getCategoryById, 
  createCategory, 
  getCategory, 
  getAllCategories,
  updateCategory,
  removeCategory
} = require('../controllers/category');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// PARAMS
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// ROUTES -->

// CREATE
router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// READ
router.get('/category/:categoryId', getCategory);

router.get('/categories', getAllCategories);

// UPDATE
router.put(
  '/category/update/:categoryId/:userId', 
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//DELETE
router.delete(
  '/category/remove/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;