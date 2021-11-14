import { useState, useRef, FormEventHandler, FormEvent } from "react";

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export default function Subscribe() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement>(null);

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl.current && inputEl.current.value) {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({
          email: inputEl.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        setForm({
          state: Form.Error,
          message: error,
        });
        return;
      }

      inputEl.current.value = "";
      setForm({
        state: Form.Success,
        message: `Hooray! You're now on the list.`,
      });
    }
  };

  return (
    <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        Subscribe to the newsletter
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        Get emails from me about web development, tech, and early access to new
        articles.
      </p>
      <form className="relative my-4" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="tim@apple.com"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-32"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
          type="submit"
        >
          {form.state === Form.Loading ? <p>Loading</p> : "Subscribe"}
        </button>
      </form>
      {form.state === Form.Error ? (
        <p>{form.message}</p>
      ) : (
        <p>{form.message}</p>
      )}
    </div>
  );
}
