const User = require('../models/user');

const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      where: errors.array()[0].param,
      error: errors.array()[0].msg
    });
  };

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "signup failed!"
      });
    };
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id
    });
  });
};


exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      where: errors.array()[0].param,
      error: errors.array()[0].msg
    });
  };
  
  User.findOne({ email }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        error: "User does not exist"
      });
    };

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or Password is incorrect!"
      });
    };

    // CREATE TOKEN
    const token = jwt.sign({_id: user._id}, process.env.SECRET);
    // PUT TOKEN IN COOKIE
    res.cookie("token", token, {expire: new Date() + 9999});

    // SEND INFORMATION TO FRONT END
    const { _id, firstName, lastName, email, role } = user;
    res.json({
      token,
      user: { _id, firstName, lastName, email, role }
    })
  });
};


exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "user signout successfully"
  });
};


// PROTECTED ROUTES or CHECKER FOR TOKEN
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: "auth"
});


// CUSTOM MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCES DENIED!"
    });
  };
  next();
};


exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin access denied.. You are not an admin!"
    });
  };
  next();
}