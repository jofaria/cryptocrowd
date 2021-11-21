// const { rawListeners } = require("../app");

const router = require("express").Router();

// require bcrypt
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// require Users
const User = require(".././models/user.model");

//Auth Routes GO HERE!

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    res.render("auth/signup-form", {
      errorMessage: "Provide a username and password",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render("auth/signup-form", {
          message: "The username already exists",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        password: hashPass,
      });

      newUser
        .save()
        .then(() => res.redirect("/"))
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
        errorMessage: "Provide a username and BLABLA";
      }

      // compare passwords

      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong password or username");
      } else if (isCorrectPassword) {
        req.session.user = user;
      }
      req.session.user = user;
    });
});

module.exports = router;
