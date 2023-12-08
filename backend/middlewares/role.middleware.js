import User from "../models/user.model.js";

const isStudent = (req, res, next) => {
  const role = req.user.role;

  if (role !== "Student") {
    return res.status(401).json({
      success: "false",
      msg: "Not Aurthorised",
    });
  }
  next();
};

const isInstructor = (req, res, next) => {
  const role = req.user.role;

  if (role !== "Instructor") {
    return res.status(401).json({
      success: "false",
      msg: "Not Aurthorised",
    });
  }
  next();
};

const isApproved = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById({_id:id})
  
  if (!user.approved) {
    return res.status(401).json({
      success: "false",
      msg: "You Approval Is In Pending. Please Wait Or Contact Admin",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  const role = req.user.role;

  if (role !== "Admin") {
    return res.status(401).json({
      success: "false",
      msg: "Not Aurthorised",
    });
  }
  next();
};

const hasPass = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById({_id:id})
  if (!user.hasPass) {
    return res.status(401).json({
      success: "false",
      msg: "Buy Any Pass First",
    });
  }
  next();
};

export { isStudent, isInstructor, isApproved, isAdmin, hasPass };
