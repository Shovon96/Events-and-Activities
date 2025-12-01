import express from 'express';
import { userRoutes } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.router';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;