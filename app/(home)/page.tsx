import { Suspense } from "react";
import Header from "@/components/header";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

import TweetContainer from "@/components/TweetContainer";

async function getInitialTweets() {
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
    orderBy: {
      created_at: "asc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;
export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <div className="wrapper">
      <Header title="요즘 일상" />
      <Suspense fallback={<div>Loading...</div>}>
        <TweetContainer initialTweets={initialTweets} />
      </Suspense>
    </div>
  );
}
