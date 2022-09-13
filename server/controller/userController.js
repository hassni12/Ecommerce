import { compareSync } from "bcrypt";
import asyncHandler from "express-async-handler";
// generateToken
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(404).json({ message: "Please enter an email address." });
  if (!password || password.length < 4)
    return res.status(404).json({
      message: "Please enter a password & lenght should be 6 or 32  ",
    });
  try {
    const user = await User.findOne({ email });

    const bcryptPasswordMatch = await user.matchPassword(password);
    if (user && bcryptPasswordMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken: generateToken(user._id),
      });
    }
  } catch (error) {
    throw new Error("invalid credentials");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(404).json({ message: "Please enter a name." });
  if (!email)
    return res.status(404).json({ message: "Please enter an email address." });
  if (!password || password.length < 6)
    return res.status(404).json({
      message: "Please enter a password & lenght should be 6 or 32  ",
    });
  const userExist = await User.findOne({ email }).exec();
  if (userExist)
    return res.status(200).json({ message: "User already exists!" });

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      accessToken: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  console.log(user);
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user, "profile");
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // password: user.password,
      isAdmin: user.isAdmin,
      accessToken: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("user profile not found");
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user, "profile");
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.name;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      accessToken: generateToken(user._id),
    });
    res.send({ message: 'user profile updated successfully' });
    console.log(updatedUser, "updatedUser");
  } else {
    res.status(404);
    res.send({ message: 'user profile not updated' });
    // throw new Error("user profile not updated");
  }
});
const adminGetUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user)

  console.log(req.user, "profile");

});
const usersDelete = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user delete successfully");
  } else {
    await user.remove();
    res.send({ message: 'User deleted successfully' });
    res.status(200).json(user)
  }
  // res.json(user)

  console.log(req.user, "profile");

});
const getAdminUserForUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    res.json({ message: "user not found" });
  } else {
    res.status(200).json(user).send({ message: "User Found successfully" });
    // res.send({ message: 'User Found successfully' });
    
  }
  // res.json(user)

  // console.log(req.user, "profile");

});
const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      accessToken: generateToken(user._id),
    });
    console.log(updatedUser, "updatedUser");
    // res.send({ message: 'user profile updated' });
  } else {
    res.status(404).send({ message: 'user profile updated successfully' });
    // throw new Error("user profile updated successfully");
  }
});


export { authUser, registerUser, getUserProfile, getAdminUserForUpdate, updateAdminUser, updateUserProfile, adminGetUsers, usersDelete };
