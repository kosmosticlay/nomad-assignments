import "../app/globals.css";

import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/20/solid";

interface InputProps {
  name: string;
  type: string;
  required: boolean;
  errors?: string[];
  placeholder: string;
}

export default function Input({
  name,
  type,
  placeholder,
  required,
  errors,
  autofocus,
}: InputProps) {
  const hasError = errors && errors.length > 0;
  return (
    <div
      className={`bg-slate-50 flex overflow-x-hidden ${
        hasError ? "outline outline-2 outline-red-500" : ""
      }`}
    >
      {name === "email" && <EnvelopeIcon className="icons" />}
      {name === "username" && <UserIcon className="icons" />}
      {name === "password" && <KeyIcon className="icons" />}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="p-2 pl-0 bg-transparent text-lg outline-none "
      ></input>
    </div>
  );
}
