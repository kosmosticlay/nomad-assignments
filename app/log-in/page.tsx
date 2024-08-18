"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { logIn } from "./action";
import Link from "next/link";

export default function Login() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div className="wrapper">
      <h1 className="h1 my-8">로그인</h1>
      <form action={dispatch} className="flex flex-col gap-2">
        <Input
          name="username"
          type="text"
          placeholder="아이디"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
      <Link
        href="/create-account"
        className="mt-4 underline underline-offset-8 hover:text-orange-100 active:click-animation"
      >
        회원가입 하러가기😍
      </Link>
    </div>
  );
}
