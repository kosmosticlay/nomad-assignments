import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending ? "bg-slate-200" : "bg-pink-300"
      } p-2 text-lg active:scale-95 transform transition-all duration-300`}
    >
      {pending ? "Loading" : "Submit"}
    </button>
  );
}
