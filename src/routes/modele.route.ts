import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createModele,
  deleteModele,
  getModeles,
  updateModele,
} from "../controller/modele.controller";
import uploadMedia from "../helper/uploadPhoto";

const router = Router();
router.use(protect);
router
  .route("/")
  .get(getModeles)
  .post(uploadMedia("modeles", "image"), createModele);
router
  .route("/:id")
  .put(uploadMedia("modeles", "image"), updateModele)
  .delete(deleteModele);
export default router;
