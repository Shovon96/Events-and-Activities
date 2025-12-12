export const dynamic = "force-dynamic";
import UsersManagementClient from "@/components/admin/UsersManagementClient";
import { serverFetch } from "@/lib/serverFetch";

export default async function UsersManagementsNavPage() {
    const response = await serverFetch.get("/users", {
        cache: "no-cache",
        next: { tags: ["users"] },
    });

    const result = await response.json();
    const users = result?.data?.filter((res: any) => res.role === "USER") || [];

    return <UsersManagementClient users={users} />;
}
