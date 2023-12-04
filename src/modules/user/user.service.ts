import isEmail from "validator/lib/isEmail";
import { UserInterface } from "./user.interfaces";
import httpStatus from "http-status";
import User from "./user.model";
import { ApiError } from "../errors";
import { isEmailTaken } from "./user.helperFunctions";
import bcrypt from "bcryptjs";

export const createUser = async (userBody: UserInterface) => {
  const emailCheck = isEmail(userBody.email);
  const emailTaken = await isEmailTaken(userBody.email);

    if (!emailCheck) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Email");
    }

    if (emailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already Taken");
    }

    return User.create({
      ...userBody,
      password: await bcrypt.hash("password1", 8),
    });

 
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email: email,
  });
  return user;
};

export const verifyPass = (pass: string, hash: string) => {
  const isMatch = bcrypt.compare(pass,hash);
  return isMatch
};
