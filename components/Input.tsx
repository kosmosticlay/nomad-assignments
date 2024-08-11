import { InputHTMLAttributes } from "react";
import "../app/globals.css";

import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/20/solid";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div className="bg-white flex overflow-x-hidden rounded-md">
        {name === "email" && <EnvelopeIcon className="icons" />}
        {name === "username" && <UserIcon className="icons" />}
        {(name === "password" || name === "confirm_password") && (
          <KeyIcon className="icons" />
        )}
        <input
          name={name}
          className="p-2 pl-0 bg-transparent text-lg text-stone-800 outline-none"
          {...rest}
        ></input>
      </div>
      {errors.map((error, index) => (
        <span key={index} className="error-msg">
          {error}
        </span>
      ))}
    </div>
  );
}
