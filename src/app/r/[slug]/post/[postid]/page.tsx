import CommentsSection from '@/components/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import PostVoteServer from '@/components/post-vote/PostVoteServer';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: {
    postid: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
const page = async ({ params }: PageProps) => {
  const cachedPosts = (await redis.hgetall(
    `posts:${params.postid}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPosts) {
    post = await db.post.findFirst({
      where: { id: params.postid },
      include: { votes: true, author: true },
    });
  }

  if (!post && !cachedPosts) return notFound();
  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <PostVoteServer
            postId={post?.id ?? cachedPosts.id}
            getData={async () => {
              return await db.post.findUnique({
                where: { id: params.postid },
                include: { votes: true },
              });
            }}
          />
        </Suspense>
        <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by u/{post?.author.username ?? cachedPosts.authorUsername}{' '}
            {formatTimeToNow(
              new Date(post?.createdAt ?? cachedPosts.createdAt)
            )}
          </p>
          <h1 className="font-semibold leading-6 text-xl py-2 text-gray-900">
            {post?.title ?? cachedPosts.title}
          </h1>
          <EditorOutput content={post?.content ?? cachedPosts.content} />

          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error server component */}
            <CommentsSection postId={post?.id ?? cachedPosts.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>
      <div className="text-center py-2 font-medium text-sm text-zinc-700">
        <Loader2 className="h-3 w-3  animate-spin" />
      </div>
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}

export default page;
