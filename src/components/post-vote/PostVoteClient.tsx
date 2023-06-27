'use client';

import { useEffect, useState } from 'react';
import { VoteType } from '@prisma/client';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { usePrevious } from '@mantine/hooks';

import { useCustomToast } from '@/hooks/use-custom-toast';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { PostVoteRequest } from '@/lib/validators/vote';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

interface PostVoteProps {
  postId: string;
  initialVoteAmnts: number;
  initialVote?: VoteType | null;
}

const PostVoteClient: React.FC<PostVoteProps> = ({
  postId,
  initialVoteAmnts,
  initialVote,
}) => {
  const { loginToast } = useCustomToast();
  const [voteAmnt, setVoteAmnt] = useState<number>(initialVoteAmnts);
  const [initVote, setInitVote] = useState(initialVote);
  const prevVote = usePrevious(initVote);

  useEffect(() => {
    setInitVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };
      await axios.patch('/api/subreddit/post/vote', payload);
    },
    onError: (err, voteType) => {
      if (voteType == 'UP') setVoteAmnt((prev) => prev - 1);
      else setVoteAmnt((prev) => prev + 1);

      //reset current vote
      setInitVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: 'Something went wrong',
        description: 'Your vote was not registered, Please try again.',
        variant: 'destructive',
      });
    },
    onMutate: (type: VoteType) => {
      if (initVote === type) {
        setInitVote(undefined);
        if (type === 'UP') setVoteAmnt((prev) => prev - 1);
        else if (type === 'DOWN') setVoteAmnt((prev) => prev + 1);
      } else {
        setInitVote(type);
        if (type === 'UP') setVoteAmnt((prev) => prev + (initVote ? 2 : 1));
        else if (type === 'DOWN')
          setVoteAmnt((prev) => prev - (initVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        onClick={() => vote('UP')}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': initVote === 'UP',
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {voteAmnt}
      </p>
      <Button
        onClick={() => vote('DOWN')}
        size="sm"
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': initVote === 'DOWN',
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
