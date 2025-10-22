'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { subscribeNewsletterAction } from 'app/actions/contact';

function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeNewsletterAction, null);

  return (
    <div className="max-w-md">
      <form action={formAction} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
          <SubscribeButton />
        </div>

        {state?.success && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {state.message}
          </p>
        )}

        {state?.error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}
      </form>
    </div>
  );
}
