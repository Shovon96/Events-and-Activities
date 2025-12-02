export interface IPaymentInit {
    eventId: string;
    userId: string;
    name: string;
    transactionId: string;
    amount: number;
    paymentGetwayData?: string;
    status: PAYMENT_STATUS
}

export enum PAYMENT_STATUS {
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    CANCEL = 'CANCEL',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}