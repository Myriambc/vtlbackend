import authRoute from "./auth.route";
import userRoute from "./user.route";
import roleRoute from "./role.route";
import saisonRoute from "./saison.route";
import phaseRoute from "./phase.route";
import ƒamilleRoute from "./famille.route";
import ligneProduitRoute from "./ligneProduit.route";
import clientRoute from "./client.route";
import modeleRoute from "./modele.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoute);
router.use("/roles", roleRoute);
router.use("/users", userRoute);
router.use("/saisons", saisonRoute);
router.use("/phases", phaseRoute);
router.use("/familles", ƒamilleRoute);
router.use("/lignes-produit", ligneProduitRoute);
router.use("/clients", clientRoute);
router.use("/modeles", modeleRoute);

export default router;
