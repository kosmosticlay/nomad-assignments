"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  console.log(state);
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="h1 my-8">회원가입</h1>
      <form action={dispatch} className="flex flex-col gap-2">
        <Input
          name="username"
          type="text"
          placeholder="아이디"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
          minLength={5}
          maxLength={50}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="계정 생성" />
      </form>
    </div>
  );
}
