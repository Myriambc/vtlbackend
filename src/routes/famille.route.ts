import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createFamille,
  deleteFamille,
  getFamilles,
  updateFamille,
} from "../controller/famille.controller";

const router = Router();
router.use(protect);
router.route("/").get(getFamilles).post(createFamille);
router.route("/:id").put(updateFamille).delete(deleteFamille);

export default router;
