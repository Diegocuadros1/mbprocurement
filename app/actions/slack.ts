"use server";

import { postToChannelByName } from "@/lib/slack/actions";

export async function notifySlack(channelName: string, text: string) {
  console.log("Posting Slack message: ", channelName, text)
  await postToChannelByName(channelName, text);
}
