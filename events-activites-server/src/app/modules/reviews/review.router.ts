import { Router } from "express";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";


const router = Router();

router.get("/event/:eventId", ReviewController.getEventByReviews);

// Get average rating for an event
router.get("/average-rating/:eventId", ReviewController.getEventAverageRating);

// Get average rating for a host
router.get("/average-rating/:hostId", ReviewController.getHostAverageRating);

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
