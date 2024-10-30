const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Material model
const User = require("../../models/User");

// Register user
router.post("/reg", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email, flag: req.body.flag }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        flag: req.body.flag,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                email: user.email,
                flag: user.flag,
              };
              res.json(payload);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login user
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const flag = req.body.flag;

  User.findOne({ email, flag }).then((user) => {
    if (!user) {
      errors.logemail = "User not found";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          flag: user.flag,
        };
        res.json(payload);
      } else {
        errors.logpassword = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
