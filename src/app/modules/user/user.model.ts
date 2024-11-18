import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, User } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);
// hashing password
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});
// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//check existing user
userSchema.statics.isUserExists = async function (email: string) {
  return await userModel.findOne({ email }).select("+password");
};

export const userModel = model<TUser, User>("User", userSchema);
