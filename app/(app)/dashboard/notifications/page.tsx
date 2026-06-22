import { requireProfile } from "@/lib/auth";
import { fetchNotifications } from "@/lib/notifications";
import { markAllNotificationsReadAction } from "@/lib/notifications/actions";
import NotificationsPage from "@/components/NotificationsPage";

export default async function NotificationsRoute() {
  const { user, profile } = await requireProfile("/auth");
  const isAdmin = profile.role === "app_admin";

  const notifications = await fetchNotifications(isAdmin, user.id);

  // Mark all as read now that the user has seen them
  await markAllNotificationsReadAction(isAdmin, user.id);

  return <NotificationsPage notifications={notifications} />;
}
