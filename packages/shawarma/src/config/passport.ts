import passport from "passport";
import PassportLocal from "passport-local";
import { User } from "../models/User";

declare module "passport-local" {
  interface IVerifyOptions {
    status: number;
  }
}

const LocalStrategy = PassportLocal.Strategy;

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
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found", status: 404 });
        }

        if (!(await user.comparePassword(password))) {
          return done(null, false, {
            message: "Incorrect password",
            status: 422
          });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);
