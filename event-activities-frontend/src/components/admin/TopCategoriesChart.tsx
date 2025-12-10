import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface TopCategoriesChartProps {
    data: Array<{ category: string; count: number }>;
}

export default function TopCategoriesChart({ data }: TopCategoriesChartProps) {
    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
    const maxCount = data.length > 0 ? Math.max(...data.map(c => c.count)) : 0;

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Top Event Categories
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <div className="space-y-4">
                        {data.map((item, index) => {
                            const percentage = (item.count / maxCount) * 100;
                            return (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                                        <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`${colors[index % colors.length]} h-2.5 rounded-full transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-48 flex items-center justify-center text-gray-400">
                        No data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
