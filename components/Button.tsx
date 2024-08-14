"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  type?: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending ? "bg-slate-200" : "bg-orange-100"
      } p-2 text-lg text-stone-800 font-semibold rounded-md active:scale-95 transform transition-all duration-300`}
    >
      {pending ? "진행중..." : text}
    </button>
  );
}
