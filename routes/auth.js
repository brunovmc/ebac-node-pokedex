const express = require("express");

const passport = require("passport");

const {
  checaAutenticado,
  checaNaoAutenticado,
} = require("./middlewares/checa-autenticacao");

const router = express.Router();

//Login
router.get("/", checaNaoAutenticado, (req, res) => {
  res.render("paginas/login", { error: req.query.erroNoLogin });
});

//Logout
router.get("/logout", checaAutenticado, async (req, res, next) => {
  req.logout(req.user, (err) => {
    if (!err) {
      return res.redirect("/auth");
    } else {
      next(err);
    }
  });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth?erroNoLogin=true",
  })
);

router.get("/google", checaNaoAutenticado, passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  checaNaoAutenticado,
  passport.authenticate("google", {
    failureRedirect: "/auth",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/github",
  checaNaoAutenticado,
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/oauth2/redirect/github",
  checaNaoAutenticado,
  passport.authenticate("github", {
    failureRedirect: "/auth",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
