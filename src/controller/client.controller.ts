import { NextFunction, RequestHandler, Response, Request } from "express";
import catchAsync from "../errorHandler/catchAsync";
import HttpError from "../errorHandler/ClientError";
import ClientRepository from "../database/repository/client.repo";
import Client from "../database/model/client.model";
import { Types } from "mongoose";

export const getClients: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const client = await ClientRepository.findAll();
    if (!client) return next(new HttpError("can not get clients", 500));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: client,
    });
  }
);

export const createClient: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const client = (await ClientRepository.createClient({
      ...req.body,
      [req?.file?.fieldname]: req?.file?.path,
    })) as Client;
    if (!client) return next(new HttpError("can not create client", 500));
    res.status(201).json({
      status: "success",
      code: 201,
      payload: client,
    });
  }
);

export const updateClient: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const client = (await ClientRepository.updateClient(
      new Types.ObjectId(id),
      { ...req.body, [req?.file?.fieldname]: req?.file?.path }
    )) as Client;
    if (!client) return next(new HttpError("can not update client", 404));
    res.status(200).json({
      status: "success",
      code: 200,
      payload: client,
    });
  }
);

export const deleteClient: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const client = await ClientRepository.deleteClient(new Types.ObjectId(id));
    if (!client) return next(new HttpError("can not delete client", 404));
    res.status(204).json({});
  }
);
