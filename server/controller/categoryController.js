import categoryModel from "../models/category.model.js";

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
        
        const data = await categoryModel.find();

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

export const updateCategoryController = async(req, res) => {
    try {
        
        const { categoryId, name, image } = req.body

        const update = await categoryModel.updateOne({
            _id: categoryId
        }, {
            name,
            image
        })

        return res.json({
            message: 'Category updated successfully',
            error: false,
            success: true,
            data: update
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}