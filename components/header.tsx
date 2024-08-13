"use client";

import Link from "next/link";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { logOut } from "@/app/(auth)/action";

export default function Header({ title }: { title: string }) {
  const handleLogOut = () => {
    logOut();
  };
  return (
    <header className="relative w-full px-5 flex justify-between items-center h-20 bg-slate-600">
      <Link href="/">
        <HomeIcon className="header-icons" />
      </Link>
      <h1 className="h1 absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>
      <div className="flex *:mx-1">
        <form action={logOut}>
          <button onClick={handleLogOut}>
            <ArrowLeftStartOnRectangleIcon className="header-icons" />
          </button>
        </form>
        <Link href="/profile">
          <UserCircleIcon className="header-icons" />
        </Link>
      </div>
    </header>
  );
}
