"use server";

import db from "@/lib/db";

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
      created_at: "asc",
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
