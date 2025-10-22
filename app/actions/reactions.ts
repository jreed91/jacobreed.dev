'use server';

import { revalidatePath } from 'next/cache';

// Simulate a database - in production, this would be in your Prisma schema
const reactions = new Map<string, { likes: number; loves: number; fires: number }>();

export type ReactionType = 'like' | 'love' | 'fire';

export interface ReactionData {
  likes: number;
  loves: number;
  fires: number;
}

export async function getReactions(slug: string): Promise<ReactionData> {
  // Simulate database read
  await new Promise((resolve) => setTimeout(resolve, 100));

  return reactions.get(slug) || { likes: 0, loves: 0, fires: 0 };
}

export async function addReaction(
  slug: string,
  reactionType: ReactionType
): Promise<ReactionData> {
  // Simulate database write delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const current = reactions.get(slug) || { likes: 0, loves: 0, fires: 0 };

  const updated = {
    ...current,
    [reactionType + 's']: current[reactionType + 's' as keyof ReactionData] + 1,
  };

  reactions.set(slug, updated);

  // Revalidate the blog post page to show updated counts
  revalidatePath(`/blog/${slug}`);

  return updated;
}

// Initialize some demo data
reactions.set('copilot-jetbrains', { likes: 12, loves: 8, fires: 15 });
reactions.set('react-query', { likes: 24, loves: 19, fires: 31 });
reactions.set('CDK', { likes: 18, loves: 14, fires: 22 });
