import { Suspense } from "react";
import Header from "@/components/header";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import TweetContainer from "@/components/TweetContainer";
import AddTweet from "@/components/AddTweet";

async function getTweets() {
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
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const initialTweets = await getTweets();

  return (
    <div className="wrapper">
      <Header title="요즘 일상" />
      <AddTweet />
      <Suspense fallback={<div>Loading...</div>}>
        <TweetContainer initialTweets={initialTweets} />
      </Suspense>
    </div>
  );
}
