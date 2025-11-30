import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";

const router = Router();

// user registration
router.post("/register",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createUserValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createUser(req, res, next)
    })

router.get("/", UserController.getAllUsers)

export const userRoutes = router;