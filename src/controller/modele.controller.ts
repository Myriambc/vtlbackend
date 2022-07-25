import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import ModeleRepository from "../database/repository/modele.repo";
import Modele from "../database/model/modele.model";
import { Types } from "mongoose";

export const getModeles: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const modele = await ModeleRepository.findAll();
    if (!modele) return next(new HttpError("can not get modeles", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: modele,
    });
  }
);

export const createModele: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const modele = (await ModeleRepository.createModele({
      ...req.body,
      [req?.file?.fieldname]: req?.file?.path,
    })) as Modele;
    if (!modele) return next(new HttpError("can not create modele", 500));
    res.status(201).json({
      status: "success",
      code: 201,
      payload: modele,
    });
  }
);

export const updateModele: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const modele = (await ModeleRepository.updateModele(
      new Types.ObjectId(id),
      {
        ...req.body,
        [req?.file?.fieldname]: req?.file?.path,
      }
    )) as Modele;
    if (!modele) return next(new HttpError("can not update modele", 404));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: modele,
    });
  }
);

export const deleteModele: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const modele = await ModeleRepository.deleteModele(new Types.ObjectId(id));
    if (!modele) return next(new HttpError("can not delete modele", 404));
    res.status(204).json({});
  }
);
