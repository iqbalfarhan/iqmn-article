import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC } from 'react';

type PostItemProps = {
  post: Post;
  href?: string;
};

const PostItem: FC<PostItemProps> = ({ post, href }) => {
  const { variant, label } = {
    variant: post.published ? 'default' : 'outline',
    label: post.published ? 'published' : 'not published',
  } as {
    variant: 'default' | 'outline';
    label: string;
  };

  return (
    <Link href={href ?? route('post.show', post.id)}>
      <Card className={cn('overflow-hidden', post.thumbnail && 'pt-0')}>
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="aspect-video w-full object-cover" />}
        <CardHeader>
          <CardTitle className="line-clamp-1" title={post.title}>
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {`Ditulis oleh ${post.user.name}, pada tanggal ${dayjs(post.created_at).format('DD MMMM YYYY HH:mm')} tentang ${post.tags.join(', ')}`}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Badge variant={'outline'}>{dayjs(post.created_at).format('DD MMMM YYYY')}</Badge>
          <Badge variant={variant}>{label}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostItem;
