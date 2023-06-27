import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import GeneralFeed from '@/components/GeneralFeed';
import CustomFeed from '@/components/CustomFeed';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className=" bg-emerald-100 px-6 py-4 ">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="h-4 w-4" /> Home
            </p>
          </div>
          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className=" text-zinc-500">
                Your personal Redito homepage. Come here to check in with your
                favourite communities.{' '}
              </p>
            </div>
            <Link
              href="/r/create"
              className={buttonVariants({ className: 'w-full mt-4 mb-6' })}
            >
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
