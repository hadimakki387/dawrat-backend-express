import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const validateRolePermission = (role: string, requestedRole: string) => {
  if (role === "upper_admin") {
    return true;
  }

  if (role === "admin" && requestedRole === "user") {
    return true;
  }

  return false;
};

const validateCreateUserRole = (req: Request, res: Response, next: NextFunction) => {
  if (validateRolePermission(req.user.role, req.body.role)) {
    return next();
  }
  res.status(httpStatus.FORBIDDEN).send("Permission denied"); 
};

const validateQueryUsersRole = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query['role']) req.query['role'] = 'user';

  if (validateRolePermission(req.user.role, req.query['role'] as string)) {
    return next();
  }
  res.status(httpStatus.FORBIDDEN).send("Permission denied"); 
};

export { validateCreateUserRole, validateQueryUsersRole };
