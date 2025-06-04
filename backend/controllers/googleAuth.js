
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { sendToken } from "../utils/jwtToken.js";


passport.use(new GoogleStrategy({
  clientID: "t.com",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/api/v1/user/auth/google/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, cb) => {
  const user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    const newUser = await User.create({
      name: profile.name.givenName + ' ' + profile.name.familyName,
      email: profile.emails[0].value,
      password: null,
    });
    console.log(process.env);
    return cb(null, newUser);
  }
  return cb(null, user);
}));



export const googleLogin = catchAsyncErrors(async (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

export const googleCallback = catchAsyncErrors(async (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/login',
  })(req, res, next);
  sendToken(req.user, 201, res, 'Logged In Successfully');
});
