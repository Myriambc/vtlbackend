import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import RoleRepository from "../database/repository/role.repo";
import Role from "../database/model/role.model";

export const getRoles: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const role = await RoleRepository.findAll();
    if (!role) return next(new HttpError("can not get roles", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: role,
    });
  }
);

export const createRole: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      label: req.body.label as string,
      code: req.body.label.toUpperCase() as string,
    };
    const role = (await RoleRepository.createRole(data)) as Role;
    if (!role) return next(new HttpError("can not create Role", 500));
    res.status(201).json({
      status: "success",
      code: 201,
      payload: role,
    });
  }
);
