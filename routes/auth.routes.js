// const { rawListeners } = require("../app");

const router = require("express").Router();

// require bcrypt
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// require Users
const User = require("../models/user.model");

// require isLoggedin middleware

const isLoggedIn = require("./../middleware/isLoggedIn");

const fileUploader = require("./../config/cloudinary.config");

//Auth Routes GO HERE!

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

router.post("/signup", fileUploader.single("profileImg"), (req, res) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    res.render("auth/signup-form", {
      errorMessage: "Provide a username and password",
    });
    return;
  }

  //const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  //if (!regex.test(password)) {
  //  res.status(400).render("auth/signup-form", {
  //    errorMessage:
  //      "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
  //  });

  //  return;
  //}

  User.findOne({ username })
    .then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render("auth/signup-form", {
          errorMessage: "The username already exists",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashPass, profileImg: req.file.path })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect("/login");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // check if all fields exist

  if (!username || !password) {
    res.render("auth/login-form", {
      errorMessage: "Provide a username and password",
    });
    return;
  }

  // check if user exists
  let user;

  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;

      if (!foundUser) {
        throw new Error("Wrong password or username");
      }

      // compare passwords

      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong password or username");
      } else if (isCorrectPassword) {
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

// GET /logout
router.get("/logout", isLoggedIn, (req, res) => {
  // Delete the session from the sessions collection
  // This automatically invalidates the future request with the same cookie
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }

    // If session was deleted successfully redirect to the home page.
    res.redirect("/");
  });
});

module.exports = router;
