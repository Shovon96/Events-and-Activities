export const dynamic = "force-dynamic";
import UsersManagementClient from "@/components/admin/UsersManagementClient";
import { serverFetch } from "@/lib/serverFetch"
import { getCookie } from "@/service/auth.service";

export default async function UsersManagementsPage() {

  const response = await serverFetch.get('/users', {
    cache: "no-cache",
    next: { tags: ["users"] }
  })

  const result = await response.json()
  const users = result?.data?.filter((res: any) => res.role === 'USER') || []
  
    const token = await getCookie("accessToken");

  return <UsersManagementClient users={users} meta={result?.meta} token={token} />;
}
