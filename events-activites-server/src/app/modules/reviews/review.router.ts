import { Router } from "express";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";


const router = Router();

router.get("/event/:eventId", ReviewController.getEventByReviews);

router.post(
    "/post-review",
    CheckAuth(UserRole.USER),
    ReviewController.postReview
);

router.patch(
    "/:id",
    CheckAuth(UserRole.USER, UserRole.ADMIN),
    ReviewController.updateReview
);

router.delete("/:id", CheckAuth(UserRole.USER, UserRole.ADMIN), ReviewController.deleteReview);

export const reviewRouter = router;
