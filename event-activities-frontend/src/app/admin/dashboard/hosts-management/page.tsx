export const dynamic = "force-dynamic";
import HostsManagementClient from "@/components/admin/HostsManagementClient";
import { serverFetch } from "@/lib/serverFetch"
import { getCookie } from "@/service/auth.service";

export default async function HostsManagementsPage() {

  const response = await serverFetch.get('/users', {
    cache: "no-cache",
    next: { tags: ["users"] }
  })

  const result = await response.json()
  const hosts = result?.data?.filter((res: any) => res.role === 'HOST') || []

  const token = await getCookie("accessToken");

  return <HostsManagementClient users={hosts}  meta={result?.meta} token={token} />;
}
