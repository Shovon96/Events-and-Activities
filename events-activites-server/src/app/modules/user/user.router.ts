import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", CheckAuth(UserRole.ADMIN), UserController.getAllUsers)

router.get('/my-profile', CheckAuth(UserRole.USER, UserRole.HOST, UserRole.ADMIN), UserController.getMyProfile)

// Update my profile
router.patch('/update-profile',
    fileUploader.upload.single('file'),
    CheckAuth(UserRole.USER, UserRole.HOST, UserRole.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        return UserController.updateMyProfile(req, res, next)
    })

// user registration
router.post("/register",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createUserValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createUser(req, res, next)
    })


export const userRoutes = router;