import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", UserSchema);
export default User;
