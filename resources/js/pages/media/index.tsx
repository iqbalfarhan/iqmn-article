import Container from '@/components/container';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Media } from '@/types';
import { Link } from '@inertiajs/react';
import { Grid, List, Trash2, Upload } from 'lucide-react';
import { FC, useState } from 'react';
import PreviewImage from './components/preview-image';
import UploadImage from './components/upload-image';

type MediaIndexProps = {
  medias: Media[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Post media',
    href: route('media.index'),
  },
];

const MediaIndex: FC<MediaIndexProps> = ({ medias }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [cari, setCari] = useState('');
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container
        title="Post media"
        actions={
          <>
            <Button size={'icon'} onClick={() => setView((old) => (old == 'grid' ? 'list' : 'grid'))}>
              {view === 'grid' ? <Grid /> : <List />}
            </Button>
            <UploadImage>
              <Button>
                <Upload /> Upload image
              </Button>
            </UploadImage>
          </>
        }
      >
        <Input type="search" placeholder="Cari media" value={cari} onChange={(e) => setCari(e.target.value)} />
        {view == 'list' && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama file</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medias
                ?.filter((item) => (cari ? item.name.toLowerCase().includes(cari.toLowerCase()) : true))
                .map((media) => (
                  <TableRow key={media.name}>
                    <TableCell>
                      <PreviewImage media={media} key={media.name}>
                        <div className="flex items-center gap-4">
                          <Avatar className="size-12 rounded">
                            <AvatarImage src={media.url} />
                          </Avatar>
                          {media.name}
                        </div>
                      </PreviewImage>
                    </TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'} asChild>
                        <Link href={route('media.destroy', media.name)} method="delete" preserveScroll>
                          <Trash2 />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        {view == 'grid' && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {medias
              ?.filter((item) => (cari ? item.name.toLowerCase().includes(cari.toLowerCase()) : true))
              .map((media) => (
                <PreviewImage media={media} key={media.name}>
                  <img src={media.url} alt={media.name} key={media.name} className="aspect-square h-full w-full rounded object-cover" />
                </PreviewImage>
              ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
};

export default MediaIndex;
