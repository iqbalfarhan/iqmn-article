import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import WelcomeLayout from '@/layouts/welcome-layout';
import { cn } from '@/lib/utils';
import { Post, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ShowContohProps = {
  post: Post;
};

const ShowContoh: FC<ShowContohProps> = ({ post }) => {
  const { appearance } = useAppearance();
  const isDarkMode: boolean = appearance === 'light' ? false : true;
  const { auth } = usePage<SharedData>().props;

  return (
    <WelcomeLayout>
      <Head title={post.title} />
      <article className={cn('col-span-3 mx-auto prose prose-lg w-full', isDarkMode ? 'prose-invert' : '')}>
        {auth && auth.user?.id === post.user.id && (
          <Button className="mb-8" asChild>
            <Link href={route('post.edit', post.id)}>
              <Edit />
              Edit post
            </Link>
          </Button>
        )}
        <h1 className="m-0 p-0">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="mx-auto aspect-video rounded-lg" />}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </WelcomeLayout>
  );
};

export default ShowContoh;
