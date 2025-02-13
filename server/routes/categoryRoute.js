import { Router } from "express"
import { addCategoryController, getCategoryController, updateCategoryController } from "../controller/categoryController.js";
import auth from "../middleware/auth.js";

const categoryRouter = Router();
categoryRouter.post('/add-category', auth, addCategoryController)
categoryRouter.get('/get-all-category', auth, getCategoryController)
categoryRouter.put('/update-category', auth, updateCategoryController)


export default categoryRouter