import Exam from "../models/exam.model.js";
import User from "../models/user.model.js";

const viewAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: "Student" });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Successfully",
      allStudents,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });
  try {
    // find this student in exam's enrolled students and delete it first from there
    for (const examId of user.exams) {
      await Exam.findByIdAndUpdate(
        examId,
        { $pull: { enrolled_students: id } },
        { new: true }
      );
    }

    await User.findByIdAndDelete({ _id: id });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const viewAllInstructors = async (req, res) => {
  try {
    const allInstructors = await User.find({ role: "Instructor" });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Successfully",
      allInstructors,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const approveInstructor = async (req, res)=>{
    const {id} = req.params
    // trycatch
  try {
    const instructor = await User.findByIdAndUpdate({_id:id},
        {
            $set : {approved:true}
        },{new:true}
        ).exec()
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Instructor Approved Successfully",
      instructor
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
}

const unApproveInstructor = async (req, res)=>{
    const {id} = req.params
    // trycatch
  try {
    const instructor = await User.findByIdAndUpdate({_id:id},
        {
            $set : {approved:false}
        },{new:true}
        ).exec()
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Instructor UnApproved Successfully",
      instructor
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
}

export { viewAllStudents, deleteStudent, viewAllInstructors, approveInstructor, unApproveInstructor };
