import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    like: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: String,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("PostSchema", PostSchema);
export default Post;
