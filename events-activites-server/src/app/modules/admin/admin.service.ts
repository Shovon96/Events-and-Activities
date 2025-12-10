import { prisma } from "../../shared/prisma";
import { EventStatus, PaymentStatus, UserRole } from "@prisma/client";

const getDashboardStats = async () => {
    // Get total users (excluding admins)
    const totalUsers = await prisma.user.count({
        where: {
            role: UserRole.USER
        }
    });

    // Get total hosts
    const totalHosts = await prisma.user.count({
        where: {
            role: UserRole.HOST
        }
    });

    // Get total events
    const totalEvents = await prisma.event.count();

    // Get active events (OPEN status)
    const activeEvents = await prisma.event.count({
        where: {
            status: EventStatus.OPEN
        }
    });

    // Get upcoming events (events with future start dates)
    const upcomingEvents = await prisma.event.count({
        where: {
            startDate: {
                gte: new Date()
            },
            status: EventStatus.OPEN
        }
    });

    // Get total revenue from completed payments
    const paymentsData = await prisma.payment.findMany({
        where: {
            paymentStatus: PaymentStatus.PAID
        },
        select: {
            amount: true
        }
    });

    const totalRevenue = paymentsData.reduce((sum, payment) => sum + Number(payment.amount), 0);

    // Get monthly new users (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsersData = await prisma.user.groupBy({
        by: ['createdAt'],
        where: {
            createdAt: {
                gte: sixMonthsAgo
            }
        },
        _count: {
            id: true
        }
    });

    // Process monthly users data
    const monthlyUsers = processMonthlyData(monthlyUsersData, 'createdAt', '_count');

    // Get monthly events created (last 6 months)
    const monthlyEventsData = await prisma.event.groupBy({
        by: ['createdAt'],
        where: {
            createdAt: {
                gte: sixMonthsAgo
            }
        },
        _count: {
            id: true
        }
    });

    const monthlyEvents = processMonthlyData(monthlyEventsData, 'createdAt', '_count');

    // Get monthly payments (last 6 months)
    const monthlyPaymentsData = await prisma.payment.groupBy({
        by: ['createdAt'],
        where: {
            createdAt: {
                gte: sixMonthsAgo
            },
            paymentStatus: PaymentStatus.PAID
        },
        _sum: {
            amount: true
        }
    });

    const monthlyPayments = processMonthlyPaymentData(monthlyPaymentsData);

    // Get top event categories/types
    const topCategoriesData = await prisma.event.groupBy({
        by: ['type'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    });

    const topCategories = topCategoriesData.map(item => ({
        category: item.type,
        count: item._count.id
    }));

    return {
        totalUsers,
        totalHosts,
        totalEvents,
        activeEvents,
        upcomingEvents,
        totalRevenue,
        monthlyUsers,
        monthlyEvents,
        monthlyPayments,
        topCategories
    };
};

// Helper function to process monthly data
function processMonthlyData(data: any[], dateField: string, countField: string) {
    const monthlyMap = new Map<string, number>();
    
    // Initialize last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        months.push(monthKey);
        monthlyMap.set(monthKey, 0);
    }

    // Aggregate data by month
    data.forEach(item => {
        const date = new Date(item[dateField]);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        const currentCount = monthlyMap.get(monthKey) || 0;
        monthlyMap.set(monthKey, currentCount + (item[countField]?.id || 1));
    });

    return months.map(month => ({
        month,
        count: monthlyMap.get(month) || 0
    }));
}

// Helper function to process monthly payment data
function processMonthlyPaymentData(data: any[]) {
    const monthlyMap = new Map<string, number>();
    
    // Initialize last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        months.push(monthKey);
        monthlyMap.set(monthKey, 0);
    }

    // Aggregate data by month
    data.forEach(item => {
        const date = new Date(item.createdAt);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        const currentAmount = monthlyMap.get(monthKey) || 0;
        monthlyMap.set(monthKey, currentAmount + Number(item._sum?.amount || 0));
    });

    return months.map(month => ({
        month,
        amount: monthlyMap.get(month) || 0
    }));
}

export const AdminService = {
    getDashboardStats
};
