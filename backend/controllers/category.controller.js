import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  // get data from body
  const { category_name, category_description } = req.body;

  // validation
  if (!category_name || !category_description) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Are Required",
    });
  }

  // Create catagoty in db
  try {
    const category = await Category.create({
      category_name,
      category_description,
      exams: [],
    });

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Category Created Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went wrong",
      error: error.message,
    });
  }
};

const showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got all Categories Successfully",
      allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const editCategory = async (req, res) => {
  // get data from body
  const { category_name, category_description, category_id } = req.body;

  // Update catagoty in db
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: category_id },
      { $set: { category_name, category_description } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Category Updated Successfully",
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went wrong",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const {id} = req.body
  try {
    await Category.findByIdAndDelete({_id:id});
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

export { createCategory, showAllCategory, editCategory, deleteCategory };
