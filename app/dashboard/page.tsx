import { requireUser } from "@/lib/auth";

export default async function Dashboard() {
  const user = await requireUser("/auth");

  return (
    <div className="flex justify-center items-center h-screen">
      Hello {user.email}!
    </div>
  );
}
