import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Post } from '@/types';
import { useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { FC, FormEvent } from 'react';
import { toast } from 'sonner';

type UploadThumbnailProps = {
  post: Post;
};
const UploadThumbnail: FC<UploadThumbnailProps> = ({ post }) => {
  const {
    data,
    setData,
    post: store,
  } = useForm({
    image: undefined as File | undefined,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    store(route('post.thumbnail', post.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Thumbnail berhasil diubah');
        setData('image', undefined);
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
    <Card>
      <CardHeader>
        <CardTitle>Thumbnail</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4">
          <FormControl label="Pilih file">
            <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0])} />
          </FormControl>

          {post?.thumbnail && !data.image && <img src={post.thumbnail} alt="preview" className="w-full" />}

          {data.image && (
            <img
              src={URL.createObjectURL(data.image)}
              alt="preview"
              className="w-full"
              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
            />
          )}

          {data.image && (
            <Button>
              <Upload />
              Upload thumbnail baru
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadThumbnail;
