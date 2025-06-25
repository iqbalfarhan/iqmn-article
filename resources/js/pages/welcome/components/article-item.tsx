import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC } from 'react';

type ArticleItemProps = {
  post: Post;
};

const ArticleItem: FC<ArticleItemProps> = ({ post }) => {
  return (
    <Link href={route('article', post.slug)}>
      <Card className="h-full space-y-0 border-0 bg-transparent py-0 shadow-none">
        <img src={post.thumbnail} alt="" className="aspect-video w-full rounded object-cover" />
        <CardContent className="flex flex-col space-y-4 p-4 py-0">
          <div className="text-lg font-bold">{post.title}</div>
          <div className="text-sm text-muted-foreground uppercase">
            {dayjs(post.created_at).format('DD MMM YYYY')} • {post.user.name}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleItem;
