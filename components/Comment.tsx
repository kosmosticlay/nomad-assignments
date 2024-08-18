"use client";

import { CommentProps } from "@/app/(auth)/action";
import { createComment, deleteComment } from "@/app/tweets/[id]/action";
import { formatToTimeAgo } from "@/lib/utils";
import { useCallback } from "react";
import { useFormState } from "react-dom";

export default function Comment({
  id,
  userId,
  comments,
}: {
  id: number;
  userId: number;
  comments: CommentProps[];
}) {
  const createCommentWithId = useCallback(
    (prevState: any, formData: FormData) =>
      createComment(id, prevState, formData),
    [id]
  );
  const [state, dispatch] = useFormState(createCommentWithId, null);
  return (
    <div className="h-content bg-slate-100 my-3 py-4">
      <h2 className="h2 mb-3 pb-3 border-b-2 border-stone-500">{`댓글 (${comments.length})`}</h2>
      <form action={dispatch} className="flex">
        <input name="comment_content" className="w-full mx-3 h-10 px-2"></input>
        <button className="w-[150px] mr-3 h-10 rounded-md bg-slate-600 text-white active:click-animation">
          댓글 쓰기
        </button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="mt-5">
          <div className="flex items-center mb-1">
            <span className="font-semibold mr-3">{comment.user.username}</span>
            <span className="text-xs text-stone-500 mr-1">
              {formatToTimeAgo(comment.created_at.toString())}
            </span>
            {userId === comment.user.id ? (
              <button
                onClick={() => deleteComment(comment.id)}
                className="inline flex-center size-5 p-1 border border-stone-500 rounded-sm hover:bg-stone-500 hover:text-white"
              >
                x
              </button>
            ) : null}
          </div>
          <p>{comment.payload}</p>
        </div>
      ))}
    </div>
  );
}
