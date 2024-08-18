"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { getUser } from "../(auth)/action";

export async function getPreviousTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 1,
    skip: page * 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getNextTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 1,
    skip: page * 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

const formSchema = z.object({
  tweet_content: z.string().max(100, "100자 이내로 작성해주세요."),
});

export async function createTweet(prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    const tweet_content = formData.get("tweet_content");

    if (typeof tweet_content !== "string") {
      return { error: "Invalid tweet content" };
    }

    const result = formSchema.safeParse({ tweet_content });

    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    if (!user) {
      return { error: "User not found" };
    }

    await db.tweet.create({
      data: {
        tweet: result.data.tweet_content,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "트윗 생성에 실패했습니다." };
  }
}
