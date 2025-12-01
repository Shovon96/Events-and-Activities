import { NextFunction, Request, Response, Router } from "express";
import CheckAuth from "../../middlewares/CheckAuth";
import { UserRole } from "@prisma/client";
import { eventValidation } from "./event.validation";
import { EventController } from "./event.controller";
import { fileUploader } from "../../helpers/fileUploader";


const router = Router();


router.get("/", EventController.getAllEvents);

router.get("/:id", EventController.getSingleEvent);

// create event
router.post("/create-event",
    fileUploader.upload.single('file'),
    CheckAuth(UserRole.HOST, UserRole.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = eventValidation.createEventValidation.parse(JSON.parse(req.body.data))
        return EventController.createEvent(req, res, next)
    })



export const eventRoutes = router;