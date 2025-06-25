import Container from '@/components/container';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { File, Image, Plus, Settings } from 'lucide-react';
import { FC } from 'react';
import CreatePost from './post/components/create-post';
import PostItem from './post/components/post-item';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type DashboardProps = {
  posts: Post[];
  counts: {
    posts?: number;
    unpublish?: number;
    medium?: number;
  };
};

const Dashboard: FC<DashboardProps> = ({ posts, counts }) => {
  const { posts: post_counts = 0, medium = 0, unpublish } = counts;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container
        title="Dashboard"
        description="Dashboard"
        actions={
          <CreatePost>
            <Button>
              <Plus /> Buat post
            </Button>
          </CreatePost>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <CardTitle>{medium} media yang diupload</CardTitle>
                <CardDescription>Media yang diupload</CardDescription>
              </div>
              <Button variant={'outline'} size={'icon'} asChild>
                <Link href={route('media.index')}>
                  <Image />
                </Link>
              </Button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <CardTitle>{post_counts} post yang dibuat</CardTitle>
                <CardDescription>{unpublish} post yang ga dipublish</CardDescription>
              </div>
              <Button variant={'outline'} size={'icon'} asChild>
                <Link href={route('post.index')}>
                  <File />
                </Link>
              </Button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <CardTitle>Edit profile.</CardTitle>
                <CardDescription>Edit profile, password dan edit thema</CardDescription>
              </div>
              <Button variant={'outline'} size={'icon'} asChild>
                <Link href={route('profile.edit')}>
                  <Settings />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </div>
        <HeadingSmall title="Postingan terakhir" description="Ini dia 4 postingan terakhir yang lo buat." />
        <div className="grid gap-6 md:grid-cols-4">
          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
