import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createSaison,
  deleteSaison,
  getSaisons,
  updateSaison,
} from "../controller/saison.controller";

const router = Router();
router.use(protect);
router.route("/").get(getSaisons).post(createSaison);
router.route("/:id").put(updateSaison).delete(deleteSaison);

export default router;
