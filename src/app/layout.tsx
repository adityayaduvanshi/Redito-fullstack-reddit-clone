import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/Toaster';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Redito',
  description: 'A Reddit clone built with Next.js and TypeScript.',
  authors: [
    { name: 'Aditya Yaduvanshi', url: 'https://adityayads.vercel.app' },
  ],
  keywords: 'redito,reddit, communities, content rating, discussion website',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white text-slate-900  antialiased light',
        inter.className
      )}
    >
      <head>
  <meta name="google-site-verification" content="WEoZUu4Alv9sBdGpdRVcHJNh1mBkElq_fyTX0XkyAvI" />
      </head>
      <body className="min-h-screen pt-12  bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />
          {authModal}
          <div className=" container max-w-6xl mx-auto h-full  pt-12">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
