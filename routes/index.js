const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const Event = require("./../models/event.model");

/* GET home page */

// router.get("/", (req, res, next) => {
//   let eventTitle = req.query.eventTitle;

//   let userIsLoggedIn = false;

//   if (req.session.user) {
//     userIsLoggedIn = true;
//   }

//   // if (!req.query) {
//   Event.find().then((allEvents) => {
//     res.render("index", {
//       userIsLoggedIn: userIsLoggedIn,
//       event: allEvents,
//     });
//   });

//   console.log("req.query", req.query.eventTitle);

//   // else {
//   //   console.log("this is the query", req.query.eventTitle);
//   //   // Event.find({ title: { $regex: eventTitle, $options: "i" } }).then(
//   //   //   (foundEvents) => {
//   //   //     res.render("index", { event: foundEvents });
//   //   //   }
//   //   // );
//   // }
// });

router.get("/", (req, res, next) => {
  let eventSearch = req.query.eventSearch;

  let userIsLoggedIn = false;

  if (req.session.user) {
    userIsLoggedIn = true;
  }

  if (!req.query.eventSearch) {
    Event.find().then((allEvents) => {
      res.render("index", {
        userIsLoggedIn: userIsLoggedIn,
        event: allEvents,
      });
    });
  } else if (req.query.eventSearch) {
    Event.find({
      $or: [
        { title: { $regex: eventSearch, $options: "i" } },
        { coin: { $regex: eventSearch, $options: "i" } },
        { location: { $regex: eventSearch, $options: "i" } },
      ],
    }).then((foundEvents) => {
      res.render("index", {
        userIsLoggedIn: userIsLoggedIn,
        event: foundEvents,
      });
    });
  }
});

// ? { $or: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }

// ! working route

// router.get("/", (req, res, next) => {
//   // Check if the incoming request has a valid cookie/session
//   let userIsLoggedIn = false;
//   if (req.session.user) {
//     userIsLoggedIn = true;
//   }
//   Event.find().then((allEvents) => {
//     console.log(allEvents);
//     res.render("index", { userIsLoggedIn: userIsLoggedIn, event: allEvents });
//   });
// });

// GET /secret
// We use the isLoggedIn middleware to protect the route

module.exports = router;
