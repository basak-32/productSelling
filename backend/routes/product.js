const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getPhoto,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// PARAMS
router.param('userId', getUserById);
router.param('productId', getProductById);

// ROUTES -->

// CREATE PRODUCT
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// GET or READ PRODUCTS
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', getPhoto);

// UPDATE PRODUCT
router.put(
  '/product/update/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// REMOVE or DELETE PRODUCT
router.delete(
  '/product/remove/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

// LISTING ROUTE
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;