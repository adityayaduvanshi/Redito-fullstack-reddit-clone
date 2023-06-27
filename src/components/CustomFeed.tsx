import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from './PostFeed';
import { getAuthSession } from '@/lib/auth';

const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunties = await db.subscription.findMany({
    where: { userId: session?.user.id },
    include: { subreddit: true },
  });

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: { in: followedCommunties.map(({ subreddit }) => subreddit.id) },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: { votes: true, subreddit: true, comments: true, author: true },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
