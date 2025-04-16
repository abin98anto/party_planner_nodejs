import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    picture: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
