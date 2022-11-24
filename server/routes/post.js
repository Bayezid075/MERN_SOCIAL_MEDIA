import express from "express";
import { getFeedPost, getUserPost, likePost } from "../controller/post.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";

// GET ALL THE POST
router.get("/", verifyToken, getFeedPost);
// GET SPECIFIC USER POST
router.get("/:userId/post", verifyToken, getUserPost);

// POST LIKE
router.patch("/:id/like", verifyToken, likePost);

export default router;
