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

// Get user details with statistics
const getUserDetails = async (userId: string) => {
    // Get user basic info
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            status: true,
            profileImage: true,
            city: true,
            bio: true,
            interests: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Initialize statistics object
    let statistics: any = {};

    if (user.role === UserRole.USER) {
        // Get user-specific statistics
        
        // Total joined events
        const totalJoinedEvents = await prisma.participant.count({
            where: { userId: user.id }
        });

        // Total paid revenue
        const userPayments = await prisma.payment.findMany({
            where: {
                userId: user.id,
                paymentStatus: PaymentStatus.PAID
            },
            select: {
                amount: true
            }
        });
        const totalPaidRevenue = userPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);

        // Total reviews given
        const totalReviews = await prisma.review.count({
            where: { authorId: user.id }
        });

        // Average rating (reviews given by this user)
        const reviewsGiven = await prisma.review.findMany({
            where: { authorId: user.id },
            select: { rating: true }
        });
        const averageRating = reviewsGiven.length > 0
            ? reviewsGiven.reduce((sum, review) => sum + Number(review.rating), 0) / reviewsGiven.length
            : 0;

        statistics = {
            totalJoinedEvents,
            totalPaidRevenue,
            totalReviews,
            averageRating: Number(averageRating.toFixed(1))
        };
    } else if (user.role === UserRole.HOST) {
        // Get host-specific statistics
        
        // Total hosted events
        const totalHostedEvents = await prisma.event.count({
            where: { hostId: user.id }
        });

        // Total earned revenue (from payments for their events)
        const hostPayments = await prisma.payment.findMany({
            where: {
                event: {
                    hostId: user.id
                },
                paymentStatus: PaymentStatus.PAID
            },
            select: {
                amount: true
            }
        });
        const totalEarnedRevenue = hostPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);

        // Active events
        const activeEvents = await prisma.event.count({
            where: {
                hostId: user.id,
                status: EventStatus.OPEN
            }
        });

        // Completed events
        const completedEvents = await prisma.event.count({
            where: {
                hostId: user.id,
                status: EventStatus.COMPLETED
            }
        });

        // Total reviews received
        const totalReviews = await prisma.review.count({
            where: { toId: user.id }
        });

        // Average rating received
        const reviewsReceived = await prisma.review.findMany({
            where: { toId: user.id },
            select: { rating: true }
        });
        const averageRating = reviewsReceived.length > 0
            ? reviewsReceived.reduce((sum, review) => sum + Number(review.rating), 0) / reviewsReceived.length
            : 0;

        statistics = {
            totalHostedEvents,
            totalEarnedRevenue,
            activeEvents,
            completedEvents,
            totalReviews,
            averageRating: Number(averageRating.toFixed(1))
        };
    }

    return {
        ...user,
        ...statistics
    };
};

// Update user status
const updateUserStatus = async (userId: string, status: 'ACTIVE' | 'INACTIVE' | 'BANNED') => {
    // Validate status
    const validStatuses = ['ACTIVE', 'INACTIVE', 'BANNED'];
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid status value");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Prevent changing admin status
    if (user.role === UserRole.ADMIN) {
        throw new Error("Cannot change admin user status");
    }

    // Update user status
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            status: true,
            updatedAt: true
        }
    });

    return updatedUser;
};

// Update user role
const updateUserRole = async (userId: string, role: 'USER' | 'HOST') => {
    // Validate role
    const validRoles = ['USER', 'HOST'];
    if (!validRoles.includes(role)) {
        throw new Error("Invalid role value. Only USER and HOST roles can be assigned.");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Prevent changing admin role
    if (user.role === UserRole.ADMIN) {
        throw new Error("Cannot change admin user role");
    }

    // Update user role
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            status: true,
            updatedAt: true
        }
    });

    return updatedUser;
};

export const AdminService = {
    getDashboardStats,
    getUserDetails,
    updateUserStatus,
    updateUserRole
};
