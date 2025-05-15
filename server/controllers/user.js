import { compare } from "bcrypt";
// import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
// import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
// import { Chat } from "../models/chat.js";
// import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import {
  cookieOptions,
  // emitEvent,
  sendToken,
  // uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";


// Create a new user and save it to the database
// save token in cookie
const newUser = TryCatch(async (req, res, next) => {

  const { name, username, password, bio } = req.body;
  const file = req.file;

  // if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  // const result = await uploadFilesToCloudinary([file]);

  // const avatar = {
  //   public_id: result[0].public_id,
  //   url: result[0].url,
  // };
  const avatar = {
    public_id: "askdjfas",
    url: "askdfn",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created");

});

// Login user and save token in cookie
const login = TryCatch(async (req, res, next) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);

});

const getMyProfile = TryCatch(async (req, res, next) => {

  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });

});

const logout = TryCatch(async (req, res) => {

  return res
    .status(200)
    .cookie("ChatPro-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });

});

const searchUser = TryCatch(async (req, res) => {

  const { name = "" } = req.query;

  // Find All my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  //  extract All Users from my chats means people I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // Find all users except me and my friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });

});


export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
};
