import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// user registration
router.post("/create-user", UserController.createUser);

// host creation
// router.post("/create-host", UserController.createHost);

// // admin creation
// router.post("/create-admin", UserController.createAdmin);

router.get("/", UserController.getUsers)

export const userRoutes = router;