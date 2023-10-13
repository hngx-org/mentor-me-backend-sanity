import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import mentorController from "@/controllers/mentor.controller";

const router: Router = Router();

router.get("/get-current", authGuard(CONFIGS.ROLES.USER), mentorController.getCurrentMentor);

router.post("/create-profile", authGuard(CONFIGS.ROLES.USER), mentorController.createProfile);

export default router;
