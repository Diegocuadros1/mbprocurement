"use server";

import { postToChannelByName } from "@/lib/slack/actions";
import { createAdminNotificationAction } from "@/lib/notifications/actions";

const MIN_SUBMIT_MS = 3000; // reject submissions faster than 3 seconds

export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  // Anti-bot fields
  website: string;      // honeypot — must be empty
  loadedAt: number;     // epoch ms when form mounted
}) {
  // Honeypot check — bots fill every field; real users never touch this
  if (formData.website) {
    // Silently succeed so bots don't know they were blocked
    return { ok: true };
  }

  // Timing check — bots submit instantly
  const elapsed = Date.now() - formData.loadedAt;
  if (elapsed < MIN_SUBMIT_MS) {
    return { ok: true };
  }

  await postToChannelByName(
    "contact-outreach",
    `*Contact Form Submitted!*\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`
  );

  await createAdminNotificationAction(
    "contact",
    "New Contact Message",
    `${formData.firstName} ${formData.lastName} (${formData.email}) sent a message.`
  );

  return { ok: true };
}
