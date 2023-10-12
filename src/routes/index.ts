import express, { Router, Request, Response } from "express";

import authRoutes from "@/routes/auth.route";
import userRoutes from "@/routes/user.route";
import configRoutes from "@/routes/config.route";
import trimIncomingRequests from "@/middlewares/trim-incoming.middleware";

const router: Router = express.Router();

// Trim edge whitepase from incoming requests
router.use(trimIncomingRequests);

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/config", configRoutes);

router.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello world from mentorMe !!" });
});

export default router;
