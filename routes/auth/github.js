// const passport = require("passport");
// const GitHubStrategy = require("passport-github2");

// const { Usuario } = require("../../models");

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ githubId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

const passport = require("passport");
const crypto = require("crypto");
const { Strategy: GithubStrategy } = require("passport-github2");
const { Usuario } = require("../../models");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_REDIRECT_URI,
      scope: ["user:email"],
    },
    async (_accessToken, _refreshToken, perfil, done) => {
      let usuario;
      const usuarioEmail = perfil.emails[0].value;
      try {
        usuario = await Usuario.findOneAndUpdate(
          { email: usuarioEmail },
          {
            githubUsuarioId: perfil.id,
          }
        );
        if (!usuario) {
          usuario = await Usuario.create({
            email: usuarioEmail,
            githubUsuarioId: perfil.id,
            nome: perfil.displayName,
            senha: (await crypto.randomBytes(48)).toString("hex"),
          });
        }
        done(null, usuario);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
