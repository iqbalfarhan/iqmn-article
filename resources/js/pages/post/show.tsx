import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Post } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DeletePost from './components/delete-post';

type PostShowProps = {
  post: Post;
};

const PostShow: FC<PostShowProps> = ({ post }) => {
  const { appearance } = useAppearance();
  const isDarkMode: boolean = appearance === 'light' ? false : true;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Postingan',
      href: '/post',
    },
    {
      title: post.title,
      href: route('post.show', post.id),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container
        title="Detail postingan"
        description={`Ditulis oleh ${post.user.name}, pada tanggal ${dayjs(post.created_at).format('DD MMMM YYYY HH:mm')}`}
        actions={
          <>
            <Button asChild>
              <Link href={route('post.edit', post.id)}>
                <Edit />
                Edit
              </Link>
            </Button>
            <DeletePost post={post}>
              <Button variant="destructive">
                <Trash2 /> Hapus
              </Button>
            </DeletePost>
          </>
        }
      >
        <article className={cn('mx-auto prose prose-lg', isDarkMode ? 'prose-invert' : '')}>
          <h1 className="m-0 p-0">{post.title}</h1>
          <p className="text-muted-foreground">{`Ditulis oleh ${post.user.name}, pada tanggal ${dayjs(post.created_at).format('DD MMMM YYYY HH:mm')} tentang ${post.tags.join(', ')}`}</p>
          {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="mx-auto aspect-video rounded-lg" />}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
      </Container>
    </AppLayout>
  );
};

export default PostShow;
