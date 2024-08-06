"use client";

import { useFormState } from "react-dom";
import { FormState, handleForm } from "./action";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const initialState: FormState = {
  errors: [],
  message: "",
};

export default function Home() {
  const [state, dispatch] = useFormState<FormState, FormData>(
    handleForm,
    initialState
  );
  return (
    <div className="w-full min-h-screen h-full bg-rose-100 flex flex-col items-center p-5">
      <span className="text-7xl">🌸</span>
      <h1 className="text-2xl mt-3 font-semibold">Komo's Assignment 26</h1>
      <h2 className="text-lg underline underline-offset-4">Forms & Actions</h2>
      <form action={dispatch} className="flex flex-col gap-2 mt-4 *:rounded-xl">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="username" type="text" placeholder="Username" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state.errors}
        />
        {state.errors &&
          state.errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
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
