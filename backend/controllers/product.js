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