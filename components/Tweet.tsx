import Link from "next/link";

export interface TweetProps {
  tweet: string;
  id: number;
  user: { username: string };
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function Tweet({ tweet, id, user }: TweetProps) {
  const truncatedTweet = truncateText(tweet, 40);
  return (
    <Link
      href={`/tweets/${id}`}
      className="h-full flex flex-col justify-between"
    >
      <p className="text-2xl font-semibold">{truncatedTweet}</p>
      <p className="pt-4 border-t-2 border-stone-500 text-end">
        <span className="text-stone-500">Written By</span> {user.username}
      </p>
    </Link>
  );
}
