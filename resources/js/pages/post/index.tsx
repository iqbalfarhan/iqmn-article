import Container from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Post } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CreatePost from './components/create-post';
import DeletePost from './components/delete-post';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Postingan',
    href: '/post',
  },
];

type PostIndexProps = {
  posts: Post[];
};

const PostIndex: FC<PostIndexProps> = ({ posts }) => {
  const [cari, setCari] = useState<string | undefined>(undefined);
  return (
    <AppLayout breadcrumbs={breadcrumbs} title="List of posts">
      <Container
        title="List of posts"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        actions={
          <CreatePost>
            <Button>
              <Plus /> Create Post
            </Button>
          </CreatePost>
        }
      >
        <Input type="search" placeholder="Cari media" value={cari} onChange={(e) => setCari(e.target.value)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created at</TableHead>
              <TableHead>Post title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts
              ?.filter((item) => (cari ? item.title.toLowerCase().includes(cari.toLowerCase()) : true))
              .map((post) => (
                <TableRow key={post.id} className={post.published ? '' : 'line-through opacity-50'}>
                  <TableCell>{dayjs(post.created_at).format('DD MMMM YYYY HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Link href={route('post.show', post.id)} className="link flex max-w-lg items-center gap-2">
                      <Avatar className="size-6 rounded">
                        <AvatarImage src={post.thumbnail ?? ''} alt={post.title} />
                        <AvatarFallback>{post.title[0]}</AvatarFallback>
                      </Avatar>
                      <span className="line-clamp-1">{post.title}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{post.user?.name}</TableCell>
                  <TableCell>{post.published ? <Badge>Published</Badge> : <Badge variant={'outline'}>Not published</Badge>}</TableCell>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('post.show', post.id)}>
                        <Folder />
                      </Link>
                    </Button>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Link href={route('post.edit', post.id)}>
                        <Edit />
                      </Link>
                    </Button>
                    <DeletePost post={post}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </DeletePost>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};

export default PostIndex;
