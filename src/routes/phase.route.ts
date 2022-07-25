import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  deleteLigneProduit,
  updateLigneProduit,
} from "../controller/ligneProduit.controller";
import {
  createPhase,
  deletePhase,
  getPhases,
  updatePhase,
} from "../controller/phase.controller";

const router = Router();
router.use(protect);
router.route("/").get(getPhases).post(createPhase);
router.route("/:id").put(updatePhase).delete(deletePhase);

export default router;
