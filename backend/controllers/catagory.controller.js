import Catagory from "../models/catagory.model.js";

const createCatagory = async (req, res) => {
  // get data from body
  const { catagory_name, catagory_description } = req.body;

  // validation
  if (!catagory_name || !catagory_description) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Are Required",
    });
  }

  // Create catagoty in db
  try {
    const catagory = await Catagory.create({
      catagory_name,
      catagory_description,
      exams: [],
    });

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Catagory Created Successfully",
      catagory,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went wrong",
      error: error.message,
    });
  }
};


export {
    createCatagory
}
