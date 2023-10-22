import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import MenteeController from "@/controllers/mentee.controller";

const router: Router = Router();

router.get("/", MenteeController.getAllMentee);

router.get("/get-current", authGuard(CONFIGS.ROLES.USER), MenteeController.getCurrentMentee);

router.post("/create-profile", authGuard(CONFIGS.ROLES.USER), MenteeController.createProfile);

router.patch("/update-profile", authGuard(CONFIGS.ROLES.USER), MenteeController.updateProfile);

router.post("/get-mentee", MenteeController.getAMentee);

export default router;
