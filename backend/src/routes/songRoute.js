import {
  addSongs,
  listsong,
  removeSong,
} from "../controllers/songController.js";

import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSongs
);
songRouter.get("/list", listsong);
songRouter.post("/remove", removeSong);

export default songRouter;
