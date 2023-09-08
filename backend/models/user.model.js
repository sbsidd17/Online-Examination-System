import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minLenght: [3, "Name should be greater than 3 charachers"],
      maxLenght: [50, "Name should be less than 50 charachers"],
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minLenght: [3, "Name should be greater than 3 charachers"],
      maxLenght: [50, "Name should be less than 50 charachers"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lovercase: true,
      unique: true,
      maxLenght: [50, "Email should be less than 50 charachers"],
    },
    password: {
      type: String,
      required: true,
      minLenght: [8, "Password should be greater than 5 charachers"],
      maxLenght: [50, "Password should be less than 50 charachers"],
    },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      default: "Student",
    },
    hasPass: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    userProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    examProgress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "examProgress",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.generateJwtToken = function () {
  const jwtToken = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRATE,
    {
      expiresIn: "24h",
    }
  );
  return jwtToken;
};

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("users", userSchema);
export default User;
