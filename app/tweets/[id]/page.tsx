import Header from "@/components/header";
import { notFound } from "next/navigation";
import { HeartIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";
import BackButton from "@/components/BackButton";
import Comment from "@/components/Comment";
import LikeButton from "@/components/LikeButton";
import { getComments, getTweet, getUser } from "@/app/(auth)/action";

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

  const user = await getUser();
  if (!user) {
    return notFound();
  }

  const comments = await getComments(id);
  if (!comments) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <Header title={`${tweet.user.username}'s tweet`} />
      <div className="mt-5 w-full flex-center rounded-md">
        <div className="p-3 w-[400px] bg-white text-stone-800">
          <div className="flex items-center pb-3 mb-3 border-b-2 border-stone-500">
            <BackButton />
            <h1 className="h2">트윗</h1>
          </div>
          <p className="h-[120px] pt-3">{tweet.tweet}</p>
          <div className="mt-3 pt-3 border-t-2 border-stone-500 flex justify-between">
            <div className="flex items-center">
              <p>Written By {tweet.user.username}</p>
              <p className="ml-3 text-stone-500 text-sm">
                {formatToTimeAgo(tweet.created_at.toString())}
              </p>
            </div>
            <p className="flex items-center">
              {tweet.Likes.length} likes
              <LikeButton
                isLiked={false}
                tweetId={tweet.id}
                likeCount={tweet.Likes.length}
              />
            </p>
          </div>
          <Comment id={id} comments={comments} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
