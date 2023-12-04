import { Request, Response } from "express";
import * as userServices from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { generateToken, saveToken } from "../token/token.service";
import moment from "moment";
import bcrypt from "bcryptjs"

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUSer = async (req: Request, res: Response) => {
  res.send({
    name: "hadi",
    family: "makki",
  });
};
