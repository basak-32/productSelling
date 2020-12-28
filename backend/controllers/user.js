const User = require('../models/user');
const Cart = require('../models/cart');

const { check, validationResult } = require('express-validator');


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found!"
      });
    };

    req.profile = user;
    next();
  });
};


exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
};


// exports.getAllUsers = (req, res) => {
//   User.find({}).exec((err, users) => {
//     if (err || !users) {
//       return res.status(400).json({
//         error: "ooopppss!!"
//       });
//     };

//     res.json(users);
//   });
// };


exports.updateUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      where: errors.array()[0].param,
      error: errors.array()[0].msg
    });
  };

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Updation CAN NOT be done!"
        });
      };

      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  )
};


exports.userPurchaseList = (req, res) => {
  Cart.find({user: req.profile._id})
    .populate('user', '_id firstName')
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "there is no item in the cart"
        });
      };

      res.json(cart);
    });
};


exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];

  req.body.cart.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      size: product.size,
      amount: req.body.cart.amount,
      transaction_id: req.body.cart.transaction_id,
    });
  });

  // STORE THIS PURCHASE LIST IN DB
  User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases: purchases}},
    {new: true},
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save the purchase list"
        });
      };

      next();
    }
  );
};