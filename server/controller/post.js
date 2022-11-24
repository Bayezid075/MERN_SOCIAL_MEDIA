import Post from "../models/post.js";
import User from "../models/user.js";
// Create Post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = await new Post({
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: picturePath,
      picturePath,
      like: {},
      comments: [],
    });
    await newPost.save();
    const post = Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL NEWSFEED POST
export const getFeedPost = async (req, res) => {
  try {
    const post = Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SPECIFIC USER ID POST
export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = Post.findById(userId);
    res.status(200).json(post);
  } catch (error) {}
};

// Like POST
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.like.get(userId);
    if (isLiked) {
      post.like.delete(userId);
    } else {
      post.like.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { like: post.like },
      { new: true }
    );
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
