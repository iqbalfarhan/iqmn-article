import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FC, FormEvent, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type CreatePostProps = PropsWithChildren;

const CreatePost: FC<CreatePostProps> = ({ children }) => {
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    content: '# isi content disini',
    tags: ['post'],
    published: false,
  });

  const handleCreatePost = () => {
    post(route('post.store'), {
      onSuccess: () => {
        toast.success('Postingan berhasil dibuat');
        reset();
      },
      onError: (e) => {
        const message = Object.entries(e)
          .map(([, value]) => value)
          .join(' ');
        toast.error(message);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Setelah ini baru lanjut isi contentnya</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleCreatePost();
          }}
          className="py-4"
        >
          <FormControl label="Judul Postingan">
            <Input type="text" placeholder="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
          </FormControl>
        </form>
        <DialogFooter>
          <Button onClick={handleCreatePost}>
            Lanjut isi content
            {processing ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
