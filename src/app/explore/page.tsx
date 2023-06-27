import GeneralFeed from '@/components/GeneralFeed';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

const page = async () => {
  const allCommunities = await db.subreddit.findMany({
    orderBy: { subscribers: { _count: 'desc' } },
    include: { subscribers: true },
  });

  return (
    <div className="max-w-5xl mb-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          Popular Communities
        </h1>
      </div>
      <div className="flex flex-row w-full flex-wrap gap-2">
        {allCommunities.map((item) => (
          <Link
            href={`/r/${item.name}`}
            key={item.id}
            className="py-4 bg-zinc-800  px-6 rounded-lg "
          >
            <p className="text-gray-200 font-semibold text-lg">r/{item.name}</p>
            <span className="text-gray-300 font-sm">
              {item.subscribers.length} members
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
