"use client";

import { createTweet } from "@/app/(home)/action";
import Button from "./Button";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function AddTweet() {
  const [state, dispatch] = useFormState(createTweet, null);
  const [textLength, setTextLength] = useState(0);

  return (
    <div className="w-full flex-center mt-10">
      <form
        action={dispatch}
        className="w-[400px] *:w-full flex flex-col items-center"
      >
        <h2 className="h2 mb-3 text-center">새로운 트윗 생성하기</h2>
        <textarea
          name="tweet_content"
          onChange={(e) => setTextLength(e.target.value.length)}
          className="resize-none w-[400px] h-[200px] p-3 mb-1 rounded-md text-stone-800"
        ></textarea>
        {state?.error && <span className="text-red-500">{state.error}</span>}
        <span className="text-end mb-3">
          {textLength <= 100 ? (
            `${textLength}/100`
          ) : (
            <>
              <span className="text-red-700">{textLength}</span>
              {"/100"}
            </>
          )}
        </span>
        <Button text="생성하기" type="submit" />
      </form>
    </div>
  );
}
