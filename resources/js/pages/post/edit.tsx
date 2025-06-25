import Container from '@/components/container';
import FormControl from '@/components/form-control';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Media, Post } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import { Check, Copy, Loader2 } from 'lucide-react';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import SearchMedia from './components/search-media';
import UploadThumbnail from './components/upload-thumbnail';

type EditPostProps = {
  medias: Media[];
  post: Post;
};

const EditPost: FC<EditPostProps> = ({ medias, post }) => {
  const { appearance } = useAppearance();
  const isDarkMode: boolean = appearance === 'light' ? false : true;
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Postingan',
      href: '/post',
    },
    {
      title: post?.title,
      href: route('post.show', post?.id),
    },
    {
      title: 'Edit',
      href: route('post.edit', post?.id),
    },
  ];

  const { data, setData, put, processing } = useForm({
    title: post?.title ?? '',
    content: post?.content ?? '',
    tags: post?.tags ?? ['post'],
    published: (post?.published ?? false) as boolean,
  });

  const handleSubmit = () => {
    put(route('post.update', post.id), {
      onSuccess: () => {
        toast.success('Post updated successfully', {
          action: {
            label: 'Lihat',
            onClick: () => {
              router.visit(route('post.show', post.id));
            },
          },
        });
      },
      onError: (e) => {
        const message = Object.entries(e)
          .map(([, value]) => value)
          .join(', ');
        toast.error(message);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container
        title={`Edit Post`}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        actions={
          <>
            <Button onClick={handleSubmit}>
              {processing ? <Loader2 className="animate-spin" /> : <Check />}
              Simpan post
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{route('article', post.slug)}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex flex-1 flex-col space-y-4">
                <FormControl label="Post title" required>
                  <Input placeholder="Judul article" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                </FormControl>
                <Tabs defaultValue="write">
                  <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      className="min-h-96 flex-1"
                      placeholder="Tulis content disini pakai format markdown"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="py-8">
                    <article className={cn('prose prose-lg min-h-96', isDarkMode ? 'prose-invert' : '')}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
                    </article>
                  </TabsContent>
                </Tabs>

                <FormControl label="Tag article" required actions={<span className="text-xs opacity-50">Pisahkan pakai komma</span>}>
                  <Input placeholder="Tags" value={data.tags.join(', ')} onChange={(e) => setData('tags', e.target.value.split(', '))} />
                </FormControl>

                <div className="flex flex-wrap gap-1.5">{Array.isArray(data.tags) && data.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6 md:w-96">
            <SearchMedia medias={medias} />
            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
                <CardDescription>Post bakal bisa dibaca oleh orang lain atau ngga?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-1 flex-col space-y-4">
                  <FormControl>
                    <Button variant={'outline'} className="justify-start" asChild>
                      <Label>
                        <Switch checked={data.published} onCheckedChange={(checked) => setData('published', checked)} />
                        <span className="ml-2">{data.published ? 'Dipublish' : 'Tidak dipublish'}</span>
                      </Label>
                    </Button>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <UploadThumbnail post={post} />
            <Card>
              <CardHeader>
                <CardTitle>Share link</CardTitle>
                <CardDescription>
                  <Link href={route('article', post.slug)}>{route('article', post.slug)}</Link>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>
                  <Copy />
                  Copy link
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
};
export default EditPost;
