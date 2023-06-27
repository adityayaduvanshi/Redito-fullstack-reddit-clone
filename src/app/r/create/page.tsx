'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CreateSubredditPayload } from '@/lib/validators/subreddit';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';

const Page = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const { loginToast } = useCustomToast();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = { name: input };
      const { data } = await axios.post('/api/subreddit', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists.',
            description: 'Please change a different subreddit name',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name.',
            description: 'Please change a name between 3 and 211 characters',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: 'Something went wrong!',
        description: 'Could not create subreddit',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full rounded-lg p-4 space-y-6  h-fit">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalzation cannot be changed.
          </p>
          <div className="relative">
            <p className=" absolute text-sm left-0 w-8 inset-y-0 grid text-zinc-400  place-items-center">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>
        <div className="flex  justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => createCommunity()}
            disabled={input.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
