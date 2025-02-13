import { Router } from "express";
import auth from "../middleware/auth.js";
import { uploadImageController } from "../controller/uploadImageController.js";
import upload from "../middleware/multer.js";
const uploadRoute = Router();

uploadRoute.post('/upload', auth, upload.single('image'), uploadImageController);

export default uploadRoute;