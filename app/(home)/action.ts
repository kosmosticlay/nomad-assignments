"use server";
import { z } from "zod";

export type FormState = {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
    };
  };
  message?: string;
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed."),
  username: z.string().min(5, "username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password contain at least 10 characters long.")
    .regex(/\d/, "Password should contain at least one number (0123456789)."),
});

export async function handleForm(prevState: FormState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!result.success) {
    return {
      errors: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      message: "",
    };
  }
  return {
    errors: {},
    message: "Welcome back!",
  };
}
