import express from "express";
import { ParticipantController } from "./participant.controller";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";

const router = express.Router();



// Join an event
router.post(
    "/join",
    CheckAuth(UserRole.USER, UserRole.HOST),
    ParticipantController.joinEvent
);


export const participantRoutes = router;
