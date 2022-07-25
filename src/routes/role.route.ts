import { Router } from "express";
import { createRole, getRoles } from "../controller/role.controller";

const router = Router();
router.route("/").get(getRoles).post(createRole);
export default router;
