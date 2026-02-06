import "server-only";
import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_BOT_TOKEN_MBP;
if (!token) {
  throw new Error(
    "Missing SLACK_BOT_TOKEN. Add it to .env.local and restart the dev server."
  );
}

const slack = new WebClient(token);

function normalizeChannelName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 80);
}

function slackErrInfo(e: any) {
  const data = e?.data ?? {};
  return {
    error: data.error ?? e?.message ?? "unknown_error",
    needed: data.needed,
    provided: data.provided,
    warning: data.warning,
    response_metadata: data.response_metadata,
    status: data.response_metadata?.status,
  };
}

/**
 * Wrap Slack SDK calls so you always get useful diagnostics in your server logs.
 */
async function safeSlackCall<T>(
  label: string,
  fn: () => Promise<T>,
  extra?: Record<string, any>
): Promise<T> {
  try {
    return await fn();
  } catch (e: any) {
    const info = slackErrInfo(e);

    console.error(`[Slack] ${label} failed`, {
      ...extra,
      ...info,
    });

    // Helpful hints for common issues
    if (info.error === "missing_scope") {
      console.error(
        `[Slack] missing_scope: add scope(s) "${info.needed}" in Slack App → OAuth & Permissions → Bot Token Scopes, then Reinstall App`
      );
    } else if (info.error === "not_in_channel") {
      console.error(
        `[Slack] not_in_channel: either invite the bot to the channel, or use chat:write.public for public channels, or call conversations.join before posting`
      );
    } else if (info.error === "invalid_auth" || info.error === "not_authed") {
      console.error(
        `[Slack] auth error: confirm SLACK_BOT_TOKEN is a Bot User OAuth Token (starts with xoxb-) and the app is installed to the workspace`
      );
    } else if (info.error === "ratelimited" || info.error === "rate_limited") {
      console.error(`[Slack] rate limited: slow down your calls and retry later`);
    }

    throw e;
  } 
}

export async function getOrCreatePublicChannelId(rawName: string) {
  const name = normalizeChannelName(rawName);

  // 1) Find existing channel by name (paginated)
  let cursor: string | undefined = undefined;
  while (true) {
    const res: any = await safeSlackCall(
      "conversations.list",
      () =>
        slack.conversations.list({
          limit: 200,
          cursor,
          types: "public_channel",
          exclude_archived: true,
        }),
      { channelName: name, cursor }
    );

    const found = res.channels?.find((c: any) => c.name === name);
    if (found?.id) return found.id;

    cursor = res.response_metadata?.next_cursor || undefined;
    if (!cursor) break;
  }

  // 2) Create channel if not found
  try {
    const created = await safeSlackCall(
      "conversations.create",
      () => slack.conversations.create({ name, is_private: false }),
      { channelName: name }
    );

    if (!created.channel?.id) {
      throw new Error("Channel created but no id returned");
    }
    return created.channel.id;
  } catch (e: any) {
    // Race condition: if two requests create the same channel at the same time
    if (e?.data?.error === "name_taken") {
      return getOrCreatePublicChannelId(name);
    }
    throw e;
  }
}

export async function uploadSpreadsheetToSlack(params: {
  channelId: string;
  fileBuffer: Buffer; // .xlsx bytes
  filename: string; // e.g. "report.xlsx"
  comment?: string; // message shown with the file
}) {
  const { channelId, fileBuffer, filename, comment } = params;

  if (!channelId) throw new Error("uploadSpreadsheetToSlack: channelId is required");
  if (!filename) throw new Error("uploadSpreadsheetToSlack: filename is required");
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error("uploadSpreadsheetToSlack: fileBuffer is empty");
  }

  await safeSlackCall(
    "filesUploadV2",
    () =>
      slack.filesUploadV2({
        channel_id: channelId,
        file: fileBuffer,
        filename,
        initial_comment: comment,
      }),
    { channelId, filename, bytes: fileBuffer.length }
  );
}

export async function postToChannelByName(
  channelName: string,
  text: string,
  filename?: string,
  spreadsheet?: Buffer
) {
  if (!channelName?.trim()) throw new Error("postToChannelByName: channelName is required");
  if (!text?.trim()) throw new Error("postToChannelByName: text is required");

  const channelId = await getOrCreatePublicChannelId(channelName);
  const secondChannelId = await getOrCreatePublicChannelId("bot-notification-channel");

  if (spreadsheet) {
    await uploadSpreadsheetToSlack({
      channelId,
      fileBuffer: spreadsheet,
      filename: filename ?? "spreadsheet.xlsx",
      comment: text,
    });

    await safeSlackCall(
      "chat.postMessage (bot-notification-channel)",
      () => slack.chat.postMessage({ channel: secondChannelId, text }),
      { secondChannelId }
    );

    return;
  }

  await safeSlackCall(
    "chat.postMessage (primary)",
    () => slack.chat.postMessage({ channel: channelId, text }),
    { channelId }
  );

  await safeSlackCall(
    "chat.postMessage (bot-notification-channel)",
    () => slack.chat.postMessage({ channel: secondChannelId, text }),
    { secondChannelId }
  );
}
