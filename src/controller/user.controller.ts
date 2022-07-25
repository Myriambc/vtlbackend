import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import UserRepository from "../database/repository/user.repo";
import User from "../database/model/user.model";

export const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserRepository.findAll();
    if (!user) return next(new HttpError("can not get users", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: user,
    });
  }
);

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (await UserRepository.createUser(req.body)) as User;
    if (!user) return next(new HttpError("can not create user", 500));
    user.password = undefined;
    res.status(201).json({
      status: "success",
      code: 201,
      payload: user,
    });
  }
);

export const getMe: RequestHandler = catchAsync(
  async (req, res: Response, next: NextFunction) => {
    const user = await UserRepository.findById(req.user._id);
    if (!user) return next(new HttpError("can not create user", 500));
    user.password = undefined;
    res.status(200).json({
      status: "success",
      code: 201,
      payload: user,
    });
  }
);
