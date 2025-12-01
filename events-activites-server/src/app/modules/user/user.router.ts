import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", UserController.getAllUsers)

router.get('/my-profile', CheckAuth(UserRole.USER), UserController.getMyProfile)

// user registration
router.post("/register",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createUserValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createUser(req, res, next)
    })


export const userRoutes = router;