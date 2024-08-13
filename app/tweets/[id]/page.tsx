import Header from "@/components/header";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { HeartIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";
import BackButton from "@/components/BackButton";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      Likes: {
        select: {
          user: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <Header title={`${tweet.user.username}'s tweet`} />
      <div className="w-full h-screen flex-center rounded-md">
        <div className="p-3 min-w-[400px] min-h-[400px] bg-white text-stone-800">
          <div className="flex items-center pb-3 mb-3 border-b-2 border-stone-500">
            <BackButton />
            <h1 className="h2">트윗</h1>
          </div>
          <p className="h-[260px] pt-3">{tweet.tweet}</p>
          <div className="mt-3 pt-3 border-t-2 border-stone-500 flex justify-between">
            <div className="flex items-center">
              <p>Written By {tweet.user.username}</p>
              <p className="ml-3 text-stone-500 text-sm">
                {formatToTimeAgo(tweet.created_at.toString())}
              </p>
            </div>
            <p className="flex">
              {tweet.Likes.length} likes <HeartIcon className="ml-1 size-6" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
