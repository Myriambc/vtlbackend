import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import PhaseRepository from "../database/repository/phase.repo";
import Phase from "../database/model/phase.model";
import { Types } from "mongoose";

export const getPhases: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const phase = await PhaseRepository.findAll();
    if (!phase) return next(new HttpError("can not get phases", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: phase,
    });
  }
);

export const createPhase: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const phase = (await PhaseRepository.createPhase(req.body)) as Phase;
    if (!phase) return next(new HttpError("can not create phase", 500));
    res.status(201).json({
      status: "success",
      code: 201,
      payload: phase,
    });
  }
);

export const updatePhase: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const phase = (await PhaseRepository.updatePhase(
      new Types.ObjectId(id),
      req.body
    )) as Phase;
    if (!phase) return next(new HttpError("can not update phase", 404));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: phase,
    });
  }
);

export const deletePhase: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const phase = await PhaseRepository.deletePhase(new Types.ObjectId(id));
    if (!phase) return next(new HttpError("can not delete phase", 404));
    res.status(204).json({});
  }
);
