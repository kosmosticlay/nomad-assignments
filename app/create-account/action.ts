"use server";
import { z } from "zod";

export type FormState = {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
      confirm_password?: string[];
    };
  };
  message?: string;
};

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, "아이디는 3자 이상 입력하세요."),
    password: z.string().min(10, "비밀번호는 10자 이상 입력하세요."),
    confirm_password: z.string(),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않아요.",
        path: ["confirm_password"],
      });
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
