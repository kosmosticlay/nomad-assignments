"use client";
import { useState } from "react";
import Tweet from "@/components/Tweet";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { getNextTweets, getPreviousTweets } from "@/app/(home)/action";
import { InitialTweets } from "@/app/(home)/page";

export default function TweetContainer({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [page, setPage] = useState(0);
  const [tweets, setTweets] = useState(initialTweets);

  const handlePreviousTweet = async () => {
    if (page > 0) {
      const previousTweet = await getPreviousTweets(page - 1);
      if (previousTweet.length > 0) {
        setTweets(previousTweet);
        setPage((prev) => prev - 1);
      }
    }
  };

  const handleNextTweet = async () => {
    const nextTweet = await getNextTweets(page + 1);
    if (nextTweet.length > 0) {
      setTweets(nextTweet);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={handlePreviousTweet}
        className="h-[200px] mr-5 hover:bg-neutral-700 rounded-md"
      >
        <ChevronLeftIcon className="size-20" />
      </button>
      <article className="hover:bg-orange-100 w-[400px] h-[200px] bg-white text-stone-800 rounded-md p-5">
        {tweets.length > 0 && (
          <Tweet
            tweet={tweets[0].tweet}
            id={tweets[0].id}
            user={tweets[0].user}
          />
        )}
      </article>
      <button
        onClick={handleNextTweet}
        className="h-[200px] ml-5 hover:bg-neutral-700 rounded-md"
      >
        <ChevronRightIcon className="size-20" />
      </button>
    </div>
  );
}
