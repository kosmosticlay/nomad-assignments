"use server";

import { getTweet, getUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  comment_content: z.string().max(100, "100자 이내로 작성해주세요."),
});

export async function createComment(
  id: number,
  prevState: any,
  formData: FormData
) {
  try {
    const user = await getUser();
    const tweet = await getTweet(id);
    const comment_content = formData.get("comment_content");

    if (typeof comment_content !== "string") {
      return { error: "Invalid comment content" };
    }

    const result = formSchema.safeParse({ comment_content });

    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    if (!user) {
      return { error: "User not found" };
    }

    if (!tweet) {
      return { error: "Tweet not found" };
    }

    await db.comment.create({
      data: {
        payload: result.data.comment_content,
        userId: user.id,
        tweetId: tweet.id,
      },
    });
    revalidatePath(`/post/${id}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "댓글 생성에 실패했습니다." };
  }
}

export async function deleteComment(id: number) {
  try {
    await db.comment.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/post/${id}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "댓글 삭제에 실패했습니다." };
  }
}

export async function likePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
export async function dislikePost(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        userId_tweetId: {
          userId: session.id!,
          tweetId,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
