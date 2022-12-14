import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import register from "./routes/auth.js";
import login from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import { verifyToken } from "./middleware/auth.js";
import { users, posts } from "./data/data.js";
import User from "./models/user.js";
import Post from "./models/post.js";
/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json()); // to accept json
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// DataBase Connection //
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected !");
  })
  .catch((error) => {
    console.log(error);
  });
/* ROUTE WITH FILE */
app.post("/post", verifyToken, upload.single("picture"));
// app.post("/auth/register", upload.single("picture"), register);
// Api - Routes //
app.use("/auth", register);
app.use("/auth", login);
app.use("/user", userRoute);
app.post("/post", postRoute);

// Run Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  // User.insertMany(users);
  // Post.insertMany(posts);
  console.log(`Server Running On Port ${PORT}`);
});
