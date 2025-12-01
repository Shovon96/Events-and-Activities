import { Router } from "express";
import { AuthController } from "./auth.controller";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/me", AuthController.getMe)

router.post("/login", AuthController.login)

router.post(
    '/change-password',
    CheckAuth(
        UserRole.USER,
        UserRole.HOST,
        UserRole.ADMIN
    ),
    AuthController.changePassword
);

export const authRoutes = router;