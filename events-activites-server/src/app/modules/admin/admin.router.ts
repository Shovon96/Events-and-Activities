import { Router } from "express";
import { AdminController } from "./admin.controller";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = Router();

// Get dashboard statistics
router.get(
    "/dashboard-stats",
    CheckAuth(UserRole.ADMIN),
    AdminController.getDashboardStats
);

export const adminRoutes = router;
