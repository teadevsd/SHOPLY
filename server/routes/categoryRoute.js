import { Router } from "express"
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controller/categoryController.js";
import auth from "../middleware/auth.js";

const categoryRouter = Router();

categoryRouter.post('/add-category', auth, addCategoryController)
categoryRouter.get('/get-all-category', auth, getCategoryController)
categoryRouter.put('/update-category', auth, updateCategoryController)
categoryRouter.delete('/delete-category', auth, deleteCategoryController)


export default categoryRouter