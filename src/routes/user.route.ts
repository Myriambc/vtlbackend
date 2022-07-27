import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import {
  createUser,
  deleteUser,
  getMe,
  getUsers,
  updateUser,
} from "../controller/user.controller";

const router = Router();
router.use(protect);
router.route("/me").get(getMe);
router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
