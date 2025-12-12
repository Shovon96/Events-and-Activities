export const dynamic = "force-dynamic";
import ManagementTable from "@/components/admin/ManagementTable"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader"
import { serverFetch } from "@/lib/serverFetch"

export default async function UsersManagementsNavPage() {

    const response = await serverFetch.get('/users', {
        cache: "no-cache",
        next: { tags: ["users"] }
    })

    const result = await response.json()
    const users = result?.data?.filter((res: any) => res.role === 'USER') || []

    return (
        <div className="max-w-7xl py-8 px-4 mx-auto">
            <div className="flex justify-center items-center max-w-xl text-center mx-auto">
                <ManagementPageHeader
                title="Manage Users"
                description="Monitor user activity, update roles, and maintain a secure user ecosystem and organize, filter, and manage all users to keep your platform running smoothly."
            />
            </div>

            {/* Users Management Table */}
            <ManagementTable users={users} userType="USER" />
        </div>
    )
}
