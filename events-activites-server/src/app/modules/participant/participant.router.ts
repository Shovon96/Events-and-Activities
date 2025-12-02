import express from "express";
import { ParticipantController } from "./participant.controller";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Get my joined events
router.get(
    "/my-events",
    CheckAuth(UserRole.USER, UserRole.HOST, UserRole.ADMIN),
    ParticipantController.getMyJoinedEvents
);

// Get participants by event
router.get(
    "/event/:eventId",
    ParticipantController.partcipantListByEvent
);

// Join an event
router.post(
    "/join",
    CheckAuth(UserRole.USER, UserRole.HOST),
    ParticipantController.joinEvent
);


export const participantRoutes = router;
