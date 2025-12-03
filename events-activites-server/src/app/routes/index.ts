import express from 'express';
import { userRoutes } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.router';
import { eventRoutes } from '../modules/events/event.router';
import { participantRoutes } from '../modules/participant/participant.router';
import { reviewRouter } from '../modules/reviews/review.router';
// import { paymentRoutes } from '../modules/payment/payment.router';


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
    },
    {
        path: '/review',
        route: reviewRouter
    },
    // {
    //     path: '/payments',
    //     route: paymentRoutes
    // }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;