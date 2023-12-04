import moment, { Moment } from "moment";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Token from "./token.model";
import { ITokenDoc } from "./token.interfaces";
import { config } from "dotenv";
import { ApiError } from "../errors";
import httpStatus from "http-status";

export const generateToken = (
  userId: string,
  expires: Moment,
  type: string,
  secret: "helloWorld"
) => {
  const payload = {
    user: userId,
    createdAt: moment().unix(),
    expires: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
}

export const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
) => {
  const tokenData = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenData;
};

export const verifyToken = async (token: string, type: string): Promise<ITokenDoc> => {
  const payload = jwt.verify(token, 'helloWorld');
  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
  }
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};