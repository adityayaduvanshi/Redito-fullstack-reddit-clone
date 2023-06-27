'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { Icons } from './Icons';
//custom hooks
import { useToast } from '@/hooks/use-toast';

interface UseAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UseAuthProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'There was an error logging with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full "
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
