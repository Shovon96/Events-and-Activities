import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SecondaryStatsCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
}

export default function SecondaryStatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor,
    iconBgColor
}: SecondaryStatsCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    </div>
                    <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
