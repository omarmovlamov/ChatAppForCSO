import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside the public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 5000; // Varsayılan bir port belirle

// MongoDB bağlantı dizesi
const MONGODB_CONNECTION =
  "mongodb+srv://omarmovlamov:XSnWFrG0I6ZmsIbo@cluster0.uux25ki.mongodb.net/";

mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
