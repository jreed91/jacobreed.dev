'use client';

import { useOptimistic, useTransition } from 'react';
import { addReaction, type ReactionData, type ReactionType } from 'app/actions/reactions';

interface BlogReactionsProps {
  slug: string;
  initialReactions: ReactionData;
}

export default function BlogReactions({ slug, initialReactions }: BlogReactionsProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticReactions, addOptimisticReaction] = useOptimistic(
    initialReactions,
    (state, reactionType: ReactionType) => ({
      ...state,
      [reactionType + 's']: state[reactionType + 's' as keyof ReactionData] + 1,
    })
  );

  const handleReaction = (reactionType: ReactionType) => {
    startTransition(async () => {
      addOptimisticReaction(reactionType);
      await addReaction(slug, reactionType);
    });
  };

  return (
    <div className="border-y border-neutral-200 dark:border-neutral-800 py-8 my-12">
      <h3 className="text-lg font-semibold mb-4">
        Did you enjoy this post?
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        React instantly with <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">useOptimistic</code> (React 19)
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => handleReaction('like')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          aria-label="Like this post"
        >
          <span className="text-2xl">👍</span>
          <span className="font-medium">{optimisticReactions.likes}</span>
        </button>

        <button
          onClick={() => handleReaction('love')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          aria-label="Love this post"
        >
          <span className="text-2xl">❤️</span>
          <span className="font-medium">{optimisticReactions.loves}</span>
        </button>

        <button
          onClick={() => handleReaction('fire')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          aria-label="This post is fire"
        >
          <span className="text-2xl">🔥</span>
          <span className="font-medium">{optimisticReactions.fires}</span>
        </button>
      </div>

      {isPending && (
        <p className="text-sm text-neutral-500 mt-3">
          Saving your reaction...
        </p>
      )}
    </div>
  );
}
