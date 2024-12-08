import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, User, TCart  } from "./user.interface";
import config from "../../config";
import { object } from "zod";

const userSchema = new Schema<TUser, User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    address: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart:  {type:[   {
      id: Types.ObjectId,
      count: Number,
    }]} ,
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
