const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

//get all users from DB
router.get("/", (req, res) => {
  User.find()
    .then(allusers => {
      for (user in allusers) {
        allusers[user].password =
          "password is hashed , u r not allowed to see it";
      }
      res.status(200).json(allusers);
    })
    .catch(err => res.status(400).send(err));
});

//get specific user
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.password = "";
      user
        ? res.status(200).json(user)
        : res.status(404).json("user not found");
    })
    .catch(err => res.status(400).send(err));
});

//edit user
router.put("/:id", (req, res) => {
  let edited = req.body;
  if (edited.password) {
    bcrypt.hash(edited.password, 10, (err, hash) => {
      edited.password = hash;
    });
  }
  setTimeout(() => {
    User.findByIdAndUpdate(req.params.id, edited)
      .then(response => {
        res.status(202).json({ msg: "edited successfully", user: response });
      })
      .catch(err => {
        res.status(400).json({ msg: "something went wrong", err: err });
      });
  }, 3000);
});

//increase the score of a selected user
router.put("/:id/increasescore", (req, res) => {
  let editedScore = req.body.score;
  User.findOne({ _id: req.params.id })
    .then(user => {
      user.score += editedScore;
      user.save().then(user => {
        res
          .status(202)
          .json({ msg: "Score Added Successfully", currentScore: user.score });
      });
    })
    .catch(err => {
      res.status(400).json({ msg: "something went wrong", err: err });
    });
});

router.post("/register", (req, res) => {
  const newUser = { ...req.body };
  User.findOne({ email: newUser.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              res
                .status(201)
                .json(`user ${newUser.email} created successfully`);
            })
            .catch(err => res.status(400).send(err));
        });
      } else {
        res.status(400).send("email exists , please use a different email ");
      }
    })
    .catch(err => res.status(400).send(err));
});

//login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let payload = { email: user.email, nickname: user.nickname };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "24h"
          });
          res.status(200).json({ msg: "logged in successfully", token: token });
        } else {
          res.status(400).send("password is not correct");
        }
      } else {
        res.status(400).send("email not found");
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
