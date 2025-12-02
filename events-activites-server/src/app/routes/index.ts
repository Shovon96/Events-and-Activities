import express from 'express';
import { userRoutes } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.router';
import { eventRoutes } from '../modules/events/event.router';
import { participantRoutes } from '../modules/participant/participant.router';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/events',
        route: eventRoutes
    },
    {
        path: '/participants',
        route: participantRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;