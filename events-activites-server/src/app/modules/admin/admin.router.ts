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

// Get user details with statistics
router.get(
    "/users/:id/details",
    CheckAuth(UserRole.ADMIN),
    AdminController.getUserDetails
);

// Update user status
router.patch(
    "/users/:id/status",
    CheckAuth(UserRole.ADMIN),
    AdminController.updateUserStatus
);

// Update user role
router.patch(
    "/users/:id/role",
    CheckAuth(UserRole.ADMIN),
    AdminController.updateUserRole
);

// Remove User
router.delete("/user/:id", CheckAuth(UserRole.ADMIN), AdminController.RemoveUser)

export const adminRoutes = router;
