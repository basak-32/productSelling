const Product = require('../models/product');

const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found!"
        });
      };

      req.product = product;
      next();
    });
};


exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "CAN NOT upload the file!"
      });
    };

    // DESTRUCTURE the fields
    const { name, description, size, price, category, inStock } = fields;

    if (!name || !description || !size || !price || !category || !inStock) {
      return res.status(400).json({
        error: "All fields are mandatory! Please provide all the field details.."
      });
    };

    let product = new Product(fields);

    // handling the file
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size exceeds the maximum range!"
        });
      };
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;

      // save product in the DB
      product.save((err, product) => {
        if (err) {
          // console.log(err);
          return res.status(400).json({
            error: "Saving product in DB was failed!"
          });
        };

        res.json(product);
      });
    };
  });
};


exports.getProduct = (req, res) => {
  req.product.photo = undefined;

  return res.json(req.product);
};


// MIDDLEWARE for GETTING PHOTO
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  };

  next();
};


// UPDATE PRODUCT CONTROLLER
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "CAN NOT upload the file!"
      });
    };

    let product = req.product;
    product = _.extend(product, fields);

    // handling the file
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size exceeds the maximum range!"
        });
      };
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;

      // save product in the DB
      product.save((err, product) => {
        if (err) {
          // console.log(err);
          return res.status(400).json({
            error: "Updation was failed!"
          });
        };

        res.json(product);
      });
    };
  });
};


// DELETE PRODUCT CONTROLLER
exports.removeProduct = (req, res) => {
  const product = req.product;

  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "product can not be removed!"
      });
    };

    res.json({
      message: `'${removedProduct.name}' product is deleted successfully`,
      removeProduct: removedProduct
    });
  });
};


// LISTING PRODUCTS CONTROLLER
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  Product.find()
    .select('-photo')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found!"
        });
      };

      res.json(products);
    });
};


exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found!"
      });
    };

    res.json(categories);
  });
};


exports.updateStock = (req, res, next) => {
  let myOperations = req.body.cart.products.map(product => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { inStock: -product.count, sold: +product.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed!"
      });
    };

    next();
  });
};