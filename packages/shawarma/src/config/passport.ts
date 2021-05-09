import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/users";
import { Account } from "../modules/account";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { IOAuth, IUser } from "@app/water";

declare module "passport-local" {
  interface IVerifyOptions {
    status: 401 | 404 | 400;
    field: string;
  }
}

export class Passport {
  static init(passport: PassportStatic) {
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

    passport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: "/api/account/link/google/callback",
          passReqToCallback: true
        },
        async (req, access_token, refresh_token, profile, done) => {
          const existing = await Account.findOne({ google_id: profile.id });
          if (existing && existing.id !== profile.id) {
            return done(null, undefined, {
              message:
                "This Google account is already linked to an App account",
              status: 401
            });
          }

          const account = await Account.findOne({
            user: req.user?.id
          }).populate("user");
          if (!account) {
            return done(null, undefined, {
              message: "Account or user does not exist"
            });
          }

          account.google_id = profile.id;
          account.tokens.push({ kind: IOAuth.GOOGLE, access_token });
          await account.save();

          done(null, account.user as IUser);
        }
      )
    );
  }
}
