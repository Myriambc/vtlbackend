import { NextFunction, RequestHandler, Response, Request } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import UserRepo from "../database/repository/user.repo";
import catchAsync from "../errorHandler/catchAsync";
import ClientError from "../errorHandler/ClientError";
import { Types } from "mongoose";

export const login: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserRepo.findByEmail(email);
    if (!user) return next(new ClientError("You dont have an account", 404));
    if (!(await user.isCorrectPassword(password, user.password)))
      return next(new ClientError("Please Provide credentials Correctly", 400));
    const accessToken = user.generateToken(
      { id: user.id },
      process.env.JWT_SECRET_STRING,
      process.env.JWT_EXPIRES
    );
    res.status(200).json({
      status: "success",
      accessToken,
    });
  }
);

export const protect: RequestHandler = catchAsync(
  async (req, res: Response, next: NextFunction) => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new ClientError("You're Not Logged In ! ", 401));
    // 2 verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING);
    // 3 check if user still exist
    //@ts-ignore
    const currentUser = await UserRepo.findById(new Types.ObjectId(decoded.id));
    if (!currentUser)
      return next(new ClientError("User is no longer exist ! ", 404));
    req.user = currentUser;
    next();
  }
);

export const restrictTo =
  (...roles: string[]) =>
  (req, res: Response, next: NextFunction) => {
    const userRoles = req.user.roles;
    if (!userRoles.some((role: { code: string }) => roles.includes(role.code)))
      return next(
        new ClientError("Youd dont have permission to perfom this action", 401)
      );
    next();
  };
