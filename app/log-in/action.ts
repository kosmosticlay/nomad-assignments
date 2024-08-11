"use server";

import { z } from "zod";

export type FormState = {
  errors?: {
    fieldErrors?: {
      username?: string[];
      password?: string[];
    };
  };
};

const formSchema = z.object({
  username: z.string().min(3, "아이디는 3자 이상 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
