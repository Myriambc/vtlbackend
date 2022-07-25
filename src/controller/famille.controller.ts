import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import FamilleRepository from "../database/repository/famille.repo";
import Famille from "../database/model/famille.model";
import { Types } from "mongoose";

export const getFamilles: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const famille = await FamilleRepository.findAll();
    if (!famille) return next(new HttpError("can not get familles", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: famille,
    });
  }
);

export const createFamille: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const famille = (await FamilleRepository.createFamille(
      req.body
    )) as Famille;
    if (!famille) return next(new HttpError("can not create famille", 500));
    res.status(201).json({
      status: "success",
      code: 201,
      payload: famille,
    });
  }
);

export const updateFamille: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const famille = (await FamilleRepository.updateFamille(
      new Types.ObjectId(id),
      req.body
    )) as Famille;
    if (!famille) return next(new HttpError("can not update famille", 404));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: famille,
    });
  }
);

export const deleteFamille: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const famille = await FamilleRepository.deleteFamille(
      new Types.ObjectId(id)
    );
    if (!famille) return next(new HttpError("can not delete famille", 404));
    res.status(204).json({});
  }
);
