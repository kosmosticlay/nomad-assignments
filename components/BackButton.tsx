"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="mr-3">
      <ArrowLeftIcon className="size-8 mr-3" />
    </button>
  );
}
