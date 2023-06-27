import Link from 'next/link';

import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { getAuthSession } from '@/lib/auth';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';
import { CompassIcon } from 'lucide-react';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 ">
      <div className="container max-w-6xl h-full  mx-auto flex items-center justify-between gap-2">
        <div className="flex flex-row gap-8 items-center">
          <Link href="/" className="flex gap-2  items-center">
            <Icons.logo className="h-8 w-8 sm:h-10 sm:w-10" />
            <p className="hidden text-zinc-700 text-md font-medium md:block">
              Redito
            </p>
          </Link>
          <Link className="flex gap-2  items-center" href="/explore">
            <p className="hidden  text-zinc-700 text-sm font-medium md:flex items-center gap-1">
              <CompassIcon className="h-4 w-4" />
              Explore
            </p>
          </Link>
        </div>

        <SearchBar />

        {session?.user ? (
          <UserAccountMenu user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
