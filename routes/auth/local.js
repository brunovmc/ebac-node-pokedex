const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalSrategy = require("passport-local").Strategy;

const { Usuario } = require("../../models");

passport.use(
  new LocalSrategy(
    {
      usernameField: "email",
    },
    async (nomeDeUsuario, senha, done) => {
      try {
        const usuario = await Usuario.findOne({ email: nomeDeUsuario });
        if (!usuario) {
          return done(null, false);
        }
        const aSenhaEstaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (aSenhaEstaCorreta) {
          return done(null, usuario);
        } else {
          return done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);

//save user session
passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

//retrieve user session
passport.deserializeUser(async (id, done) => {
  let err, usuario;
  try {
    usuario = await Usuario.findById(id);
  } catch (err) {
    err = err;
  }
  done(err, usuario);
});
