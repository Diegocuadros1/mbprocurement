import "server-only";
import { WebClient } from "@slack/web-api";

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

function normalizeChannelName(name: string) {
  // Slack channel names: lowercase, numbers, hyphens, underscores, <= 80 chars
  // Slack will validate/adjust too, but do it yourself to avoid surprises.
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 80);
}

// Finds by name; if missing, creates; returns channel ID
export async function getOrCreatePublicChannelId(rawName: string) {
  const name = normalizeChannelName(rawName);

  // 1) Search existing channels (paginate)
  let cursor: string | undefined = undefined;
  while (true) {
    const res = await slack.conversations.list({
      limit: 200,
      cursor,
      types: "public_channel",
      exclude_archived: true,
    });

    const found = res.channels?.find((c) => c.name === name);
    if (found?.id) return found.id;

    cursor = res.response_metadata?.next_cursor || undefined;
    if (!cursor) break;
  }

  // 2) Create channel if not found
  try {
    const created = await slack.conversations.create({ name, is_private: false });
    if (!created.channel?.id) throw new Error("Channel created but no id returned");
    return created.channel.id;
  } catch (e: any) {
    // Race condition: if two requests create at once, Slack may say name_taken.
    // In that case, list again quickly.
    if (e?.data?.error === "name_taken") {
      return getOrCreatePublicChannelId(name);
    }
    throw e;
  }
}

export async function postToChannelByName(channelName: string, text: string) {
  const channelId = await getOrCreatePublicChannelId(channelName);
  const secondChannelId = await getOrCreatePublicChannelId("bot-notification-channel")

  // If you don't have chat:write.public, make sure the bot is in the channel:
  // await slack.conversations.join({ channel: channelId });

  await slack.chat.postMessage({ channel: channelId, text });
  await slack.chat.postMessage({channel: secondChannelId, text})
}
