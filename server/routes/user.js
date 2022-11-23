import express from "express";
const router = express.Router();
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

// Read
router.get("/:id", verifyToken, getUser);
router.get("/friend/:id", verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);
export default router;
