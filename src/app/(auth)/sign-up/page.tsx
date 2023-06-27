import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import SignUp from '@/components/SignUp';

const page: React.FC = ({}) => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            ' self-start -mt-20 '
          )}
        >
          <ChevronLeft /> Home
        </Link>
        <SignUp />
      </div>
    </div>
  );
};

export default page;
