import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  // get data from body
  const { category_name, category_description, category_image } = req.body;

  // validation
  if (!category_name || !category_description || !category_image) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Are Required",
    });
  }

  // take image and upload it to cloudnary
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ width: 320, height: 180, crop: "fill" }],
    });

    category_image = cloudinaryResponse.secure_url;

    // Delete file from server after upload to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return console.error("Error deleting file:", err);
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Error in uploading Thumbnail",
      error: error.message,
    });
  }

  // Create catagoty in db
  try {
    const category = await Category.create({
      category_name,
      category_description,
      category_image,
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
    const allCategory = await Category.find({}).populate("exams");
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

const getCategory = async (req, res) => {
  const {id} = req.params
  try {
    const category = await Category.findById({_id:id}).populate("exams");
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got Category Successfully",
      category,
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

export { createCategory, showAllCategory, getCategory, editCategory, deleteCategory };
