import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { copyToClipboard } from '@/lib/utils';
import UploadImage from '@/pages/media/components/upload-image';
import { Media } from '@/types';
import { Upload } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type SearchMediaProps = {
  medias: Media[];
};

const SearchMedia: FC<SearchMediaProps> = ({ medias }) => {
  const [cari, setCari] = useState<string | undefined>(undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih media untuk di-embed</CardTitle>
        <CardDescription>Klik media, terus di paste ke write</CardDescription>
      </CardHeader>
      <CardHeader>
        <Input type="search" placeholder="Cari media" value={cari} onChange={(e) => setCari(e.target.value)} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-40">
          <div className="grid grid-cols-4 gap-1">
            {medias
              ?.filter((item) => (cari ? item.name.toLowerCase().includes(cari.toLowerCase()) : true))
              .map((file) => (
                <Avatar
                  className="size-full cursor-pointer rounded-none hover:opacity-50"
                  onClick={() => {
                    copyToClipboard(file.markdown);
                    toast.success('image markdown copied to clipboard');
                  }}
                >
                  <AvatarImage src={file.url} alt="@shadcn" />
                </Avatar>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <UploadImage>
          <Button>
            <Upload />
            Upload image
          </Button>
        </UploadImage>
      </CardFooter>
    </Card>
  );
};

export default SearchMedia;
