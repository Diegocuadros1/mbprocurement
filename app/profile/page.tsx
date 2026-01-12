import { requireUser } from "@/lib/auth";

export default async function Dashboard() {
  const user = await requireUser("/auth");

  return (
    <div className="flex justify-center items-center h-screen">
      Profile: Hello {user.email}!
    </div>
  );
}
