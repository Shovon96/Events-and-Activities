export const dynamic = "force-dynamic";
import HostsManagementClient from "@/components/admin/HostsManagementClient";
import { serverFetch } from "@/lib/serverFetch"

export default async function HostsManagementsPage() {

  const response = await serverFetch.get('/users', {
    cache: "no-cache",
    next: { tags: ["users"] }
  })

  const result = await response.json()
  const hosts = result?.data?.filter((res: any) => res.role === 'HOST') || []

  return <HostsManagementClient users={hosts}  meta={result?.meta}/>;
}
