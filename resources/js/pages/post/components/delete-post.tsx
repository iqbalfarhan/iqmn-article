import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Post } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type DeletePostProps = PropsWithChildren & {
  post: Post;
};

const DeletePost: FC<DeletePostProps> = ({ children, post }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus post</AlertDialogTitle>
          <AlertDialogDescription>Yakin nih mau ngehapus {post.title}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalin</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              router.delete(route('post.destroy', post.id), {
                preserveScroll: true,
                onSuccess: () => {
                  toast.success('Post berhasil dihapus');
                },
              });
            }}
          >
            <Trash2 /> Ya, hapus post ini
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
