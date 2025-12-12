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
    const hosts = result?.data?.filter((res: any) => res.role === 'HOST') || []


    return (
        <div className="max-w-7xl py-8 px-4 mx-auto">
            <div className="flex justify-center items-center max-w-xl text-center mx-auto">
                <ManagementPageHeader
                    title="Manage Hosts"
                    description="Monitor host activity, update roles, and maintain a secure user ecosystem and organize, filter, and manage all hosts to keep your platform running smoothly."
                />
            </div>

            {/* Hosts Management Table */}
            <ManagementTable users={hosts} userType="HOST" />
        </div>
    )
}
