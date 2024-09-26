import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
// import { googleLogin, googleCallback } from "./googleAuth.js";

// export const register = catchAsyncErrors(async (req, res, next) => {
//   const { name, email, phone, password } = req.body;
//   if (!name || !email || !phone || !password ) {
//     return next(new ErrorHandler("Please fill full form!"));
//   }
//   const isEmail = await User.findOne({ email });
//   if (isEmail) {
//     return next(new ErrorHandler("Email already registered!"));
//   }
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password,
//   });
//   sendToken(user, 201, res, "User Registered!");
// });

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password ) {
    return next(new ErrorHandler("Please fill out the entire form!"));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const passwordErrors = [];

  if (password.length < 5) {
    passwordErrors.push("Password must be at least 5 characters long!");
  }

  if (!/[a-z]/.test(password)) {
    passwordErrors.push("Password must contain at least one lowercase letter!");
  }

  if (!/[A-Z]/.test(password)) {
    passwordErrors.push("Password must contain at least one uppercase letter!");
  }

  if (!/[0-9]/.test(password)) {
    passwordErrors.push("Password must contain at least one number!");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordErrors.push("Password must contain at least one special character!");
  }

  if (passwordErrors.length > 0) {
    return next(new ErrorHandler(passwordErrors.join(", ")));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  sendToken(user, 201, res, "User Registered!");
});



export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, " Logged In Sucessfully");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// export { googleLogin, googleCallback };