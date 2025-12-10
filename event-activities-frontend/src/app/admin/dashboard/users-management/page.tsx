import ManagementTable from "@/components/admin/ManagementTable"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader"
import { serverFetch } from "@/lib/serverFetch"

export default async function UsersManagementsPage() {

  const response = await serverFetch.get('/users', {
    cache: "no-cache",
    next: { tags: ["users"] }
  })

  const result = await response.json()
  const users = result?.data?.filter((res: any) => res.role === 'USER') || []

  return (
    <div>
      <ManagementPageHeader
        title="Manage Users"
        description="Only admin can manage users."
      />

      {/* Users Management Table */}
      <ManagementTable users={users} userType="USER" />
    </div>
  )
}
