"use client";

import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending
          ? "bg-slate-200"
          : "bg-orange-100 text-stone-800 font-semibold rounded-md"
      } p-2 text-lg active:scale-95 transform transition-all duration-300`}
    >
      {pending ? "로딩중..." : text}
    </button>
  );
}
