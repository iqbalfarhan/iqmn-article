import { Input } from '@/components/ui/input';
import WelcomeLayout from '@/layouts/welcome-layout';
import { Post } from '@/types';
import { FC, useState } from 'react';
import ArticleItem from './components/article-item';

type WelcomeProps = {
  posts: Post[];
};

const Welcome: FC<WelcomeProps> = ({ posts }) => {
  const [cari, setCari] = useState<string | undefined>(undefined);
  return (
    <WelcomeLayout>
      <div className="mx-auto max-w-6xl gap-4 space-y-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Postingan terakhir</h1>
          <Input type="text" placeholder="Cari postingan..." className="max-w-xs" onChange={(e) => setCari(e.target.value)} />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts
            ?.filter((item) => (cari ? item.title.toLowerCase().includes(cari.toLowerCase()) : true))
            .map((post) => <ArticleItem key={post.id} post={post} />)}
        </div>
      </div>
    </WelcomeLayout>
  );
};

export default Welcome;
