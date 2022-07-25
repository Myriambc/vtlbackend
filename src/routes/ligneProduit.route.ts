import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createLigneProduit,
  deleteLigneProduit,
  getLigneProduits,
  updateLigneProduit,
} from "../controller/ligneProduit.controller";

const router = Router();
router.use(protect);
router.route("/").get(getLigneProduits).post(createLigneProduit);
router.route("/:id").put(updateLigneProduit).delete(deleteLigneProduit);

export default router;
