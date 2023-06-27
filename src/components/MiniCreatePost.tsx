'use client';

import { Session } from 'next-auth';
import { useRouter, usePathname } from 'next/navigation';
import { ImageIcon, Link2 } from 'lucide-react';

import UserAvatar from './UserAvatar';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface MiniCreateProps {
  session: Session | null;
}

const MiniCreatePost: React.FC<MiniCreateProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <li className="overflow-hidden rounded-md shadow bg-white ">
      <div className="h-full px-6 py-4 flex  flex-row justify-between gap-6 ">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />
          <span className=" absolute bottom-6 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input
          readOnly
          onClick={() => router.push(pathname + '/submit')}
          placeholder="Create Post"
        />
        <Button
          onClick={() => router.push(pathname + '/submit')}
          variant="ghost"
        >
          <ImageIcon />
        </Button>
        <Button
          onClick={() => router.push(pathname + '/submit')}
          variant="ghost"
        >
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
