import express from "express";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";


const app = express.Router();

// user must be logged to access the below routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);
app.put(
  "/removemember",
  removeMember
);

app.delete("/leave/:id", leaveGroup);

// Send Attachments
app.post(
  "/message",
  attachmentsMulter,
  sendAttachments
);

// Get Chat Details, rename, delete
app
  .route("/:id")
  .get(getChatDetails)
  .put(renameGroup)
  .delete(deleteChat);

// Get Messages
app.get("/message/:id", getMessages);


export default app;
