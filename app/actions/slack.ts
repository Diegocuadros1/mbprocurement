"use server";

import { postToChannelByName } from "@/lib/slack/actions";

export async function notifySlack(channelName: string, text: string, file?: { filename: string; base64: string; mimeType?: string }
) {

  const buffer = file ? Buffer.from(file.base64, "base64") : undefined;
  await postToChannelByName(channelName, text, file?.filename, buffer);
  
}
