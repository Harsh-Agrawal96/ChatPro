import express from "express";
import {
  // acceptFriendRequest,
  // getMyFriends,
  // getMyNotifications,
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  // sendFriendRequest,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";


const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);


// user must be logged in to access the remain routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);

app.get("/search", searchUser);

// app.put(
//   "/sendrequest",
//   sendRequestValidator(),
//   validateHandler,
//   sendFriendRequest
// );

// app.put(
//   "/acceptrequest",
//   acceptRequestValidator(),
//   validateHandler,
//   acceptFriendRequest
// );

// app.get("/notifications", getMyNotifications);

// app.get("/friends", getMyFriends);


export default app;
