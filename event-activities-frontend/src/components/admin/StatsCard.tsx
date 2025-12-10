import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number;
    growth: number;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
    borderColor: string;
    formatValue?: (value: number) => string;
}

export default function StatsCard({
    title,
    value,
    growth,
    icon: Icon,
    iconColor,
    iconBgColor,
    borderColor,
    formatValue = (val) => val.toLocaleString()
}: StatsCardProps) {
    return (
        <Card className={`hover:shadow-lg transition-shadow border-l-4 ${borderColor}`}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <h3 className="text-3xl font-bold text-gray-900">{formatValue(value)}</h3>
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-semibold">+{growth}%</span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    </div>
                    <div className={`w-14 h-14 ${iconBgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${iconColor}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
