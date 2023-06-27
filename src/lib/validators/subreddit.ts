import { z } from 'zod';

export const SubredditValidator = z.object({
  name: z.string().max(21).min(3),
});

export const SubredditSubscriptionValidator = z.object({
  subredditId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;

export type SubscribeToSubredditPayload = z.infer<
  typeof SubredditSubscriptionValidator
>;
