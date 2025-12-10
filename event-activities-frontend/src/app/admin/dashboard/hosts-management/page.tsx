import ManagementTable from "@/components/admin/ManagementTable"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader"
import { serverFetch } from "@/lib/serverFetch"

export default async function HostsManagementsPage() {

  const response = await serverFetch.get('/users', {
    cache: "no-cache",
    next: { tags: ["users"] }
  })

  const result = await response.json()
  const hosts = result?.data?.filter((res: any) => res.role === 'HOST') || []

  return (
    <div>
      <ManagementPageHeader
        title="Manage Hosts"
        description="Only admin can manage hosts."
      />

      {/* Hosts Management Table */}
      <ManagementTable users={hosts} userType="HOST" />
    </div>
  )
}
