import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { PaymentController } from './app/modules/payment/payment.controller';


const app: Application = express();

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    PaymentController.handleStripeWebhookEvent
);

app.use(cors({
    origin: ["http://localhost:3000", "https://eventora-zeta.vercel.app"],
    credentials: true
}));


//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/v1/api", router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Server is running",
        success: true,
        environment: process.env.NODE_ENV,
        timeStamp: new Date().toISOString()
    })
});

app.get("/ping", (req: Request, res: Response) => {
    res.send({
        message: "ping running",
        success: true
    });
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;