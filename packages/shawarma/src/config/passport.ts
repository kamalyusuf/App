import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User";

declare module "passport-local" {
  interface IVerifyOptions {
    status: 401 | 404;
    field: string;
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          return done(null, false, {
            message: "User not found",
            status: 404,
            field: "email"
          });
        }

        if (!(await user.comparePassword(password))) {
          return done(null, false, {
            message: "Incorrect password",
            status: 401,
            field: "password"
          });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);
