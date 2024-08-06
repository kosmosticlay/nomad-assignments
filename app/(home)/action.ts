"use server";

export type FormState = {
  errors?: string[];
  message?: string;
};

export async function handleForm(prevState: FormState, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (formData.get("password") !== "12345") {
    return {
      errors: ["Wrong password"],
      message: "",
    };
  } else {
    return {
      errors: [],
      message: "Welcome back!",
    };
  }
}
