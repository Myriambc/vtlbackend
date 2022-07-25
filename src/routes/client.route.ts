import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../controller/client.controller";
import uploadMedia from "../helper/uploadPhoto";

const router = Router();
router.use(protect);
router
  .route("/")
  .get(getClients)
  .post(uploadMedia("clients", "logo"), createClient);
router
  .route("/:id")
  .put(uploadMedia("clients", "logo"), updateClient)
  .delete(deleteClient);

export default router;
