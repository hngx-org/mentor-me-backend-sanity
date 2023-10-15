import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import MentorController from "@/controllers/mentor.controller";

const router: Router = Router();

router.get("/", MentorController.getAllMentors);

router.get("/get-current", authGuard(CONFIGS.ROLES.USER), MentorController.getCurrentMentor);

router.post("/create-profile", authGuard(CONFIGS.ROLES.USER), MentorController.createProfile);

router.patch("/update-profile", authGuard(CONFIGS.ROLES.USER), MentorController.updateProfile);

router.post("/account-verification", authGuard(CONFIGS.ROLES.USER), MentorController.verifyProfile);

export default router;
