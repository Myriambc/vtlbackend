import { Router } from "express";
import { protect, restrictTo } from "../controller/auth.controller";
import { createUser, getMe, getUsers } from "../controller/user.controller";

const router = Router();
router.use(protect);
router.route("/me").get(getMe);
router.route("/").get(getUsers).post(createUser);

export default router;
