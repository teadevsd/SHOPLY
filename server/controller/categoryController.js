import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import subCategoryModel from "../models/subCategry.model.js";

export const addCategoryController = async(req, res) =>{
    try {
        const { name, image } = req.body;

        if(!name || !image){
            return res.status(400).json({
                message: "Provide both name and image",
                error: true,
                success: false
            })
        }

        const addCategory = categoryModel({
            name,
            image
        })
        const saveCategory = await addCategory.save();

        return res.status(200).json({
            message: "Category added successfully",
            error: false,
            success: true,
            data: saveCategory
        })

        if(!saveCategory) {
            return res.status(500).json({
                message: "Data not saved",
                errro: true,
                success: false
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: true,
            true: false
        })
    }
};

export const getCategoryController = async(req, res) =>{
    try {
        
        const data = await categoryModel.find().sort({ createdAt: -1 });

        return res.json({
            data: data,
            error: false,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            succes: false
        })
    }
};

export const updateCategoryController = async (req, res) =>{
    try {
        const { _id, name, image } = req.body;

        if (!_id || !name || !image) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true,
                success: false,
            });
        }

        // Find and update the category
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            _id,
            { name, image },
            { new: true } // Returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            error: false,
            success: true,
            data: updatedCategory,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body;

        const checkSubcategory = await subCategoryModel.countDocuments({
            category: { "$in": [_id] }
        });

        const checkProduct = await productModel.countDocuments({
            category: { "$in": [_id] }
        });

        if (checkSubcategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category has subcategory or product",
                error: true,
                success: false
            });
        }

        const deleteCategory = await categoryModel.deleteOne({ _id });
        
        return res.status(200).json({
            message: "Category deleted successfully",
            error: false,
            success: true,
            data: deleteCategory
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
