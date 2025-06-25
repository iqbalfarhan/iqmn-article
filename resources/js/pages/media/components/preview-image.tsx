import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Media } from '@/types';
import { Link } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type PreviewImageProps = PropsWithChildren & {
  media: Media;
};
const PreviewImage: FC<PreviewImageProps> = ({ children, media }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="line-clamp-1">Media preview</DialogTitle>
          <DialogDescription className="line-clamp-1">{media.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col">
          <div>
            <img src={media.url} alt={media.name} key={media.name} />
          </div>
        </div>
        <DialogFooter>
          <Button variant={'destructive'} asChild>
            <Link href={route('media.destroy', media.name)} method="delete" preserveScroll>
              <Trash2 />
              Delete
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImage;
