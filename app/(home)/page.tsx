"use client";

import { useFormState } from "react-dom";
import { FormState, handleForm } from "./action";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const initialState: FormState = {
  errors: {},
  message: "",
};

export default function Home() {
  const [state, dispatch] = useFormState<FormState, FormData>(
    handleForm,
    initialState
  );

  //  console.log(state.errors?.fieldErrors);
  return (
    <div className="w-full min-h-screen h-full bg-rose-100 flex flex-col items-center p-5">
      <span className="text-7xl">🌸</span>
      <h1 className="text-2xl mt-3 font-semibold">Komo's Assignment 27</h1>
      <h2 className="text-lg underline underline-offset-4">Zexy Zod</h2>
      <form
        action={dispatch}
        className="w-[420px] flex flex-col gap-2 mt-4 *:rounded-xl"
      >
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state.errors?.fieldErrors?.email}
        />
        {state.errors?.fieldErrors?.email ? (
          <span className="error-msg">{state.errors?.fieldErrors?.email}</span>
        ) : null}
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state.errors?.fieldErrors?.username}
        />
        {state.errors?.fieldErrors?.username ? (
          <span className="error-msg">
            {state.errors?.fieldErrors?.username}
          </span>
        ) : null}
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state.errors?.fieldErrors?.password}
        />
        {state.errors?.fieldErrors?.password
          ? state.errors?.fieldErrors?.password.map((error, index) => (
              <span key={index} className="error-msg">
                {error}
              </span>
            ))
          : null}
        <Button />
        {state.message && (
          <div className="bg-green-600 flex items-center">
            <CheckCircleIcon className="icons" />
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
