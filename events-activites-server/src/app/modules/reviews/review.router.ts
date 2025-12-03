import { Router } from "express";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";


const router = Router();


router.post(
    "/post-review",
    CheckAuth(UserRole.USER),
    ReviewController.postReview
);


export const reviewRouter = router;
