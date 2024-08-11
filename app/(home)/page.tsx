import Link from "next/link";

export default function home() {
  return (
    <div className="w-full min-h-screen h-full bg-stone-800 flex-center flex-col">
      <h1 className="h1">🌸Komo's Assignment 29🌸</h1>
      <h2 className="mt-2 mb-8 h2 underline underline-offset-4">
        Authentication
      </h2>
      <div className=" bg-stone-800 flex-center gap-3">
        <Link href="/create-account" className="homeBtn">
          회원가입
        </Link>
        <Link href="/log-in" className="homeBtn">
          로그인
        </Link>
      </div>
    </div>
  );
}
