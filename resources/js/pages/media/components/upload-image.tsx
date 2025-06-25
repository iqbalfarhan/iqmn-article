import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import { Loader2, Upload } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

type UploadImageProps = PropsWithChildren;

const UploadImage: FC<UploadImageProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, processing, post, reset } = useForm({
    file: [] as File[],
  });

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = data.file.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data.file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setData('file', files);
  };

  const handleSubmit = () => {
    post(route('media.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Upload berhasil');
        reset();
        setPreviews([]);
        setIsOpen(false);
      },
      onError: (e) => toast.error(Object.values(e).flat().join(', ')),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Gambar</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-4">
          <FormControl label="Pilih file">
            <Input type="file" accept="image/*" multiple onChange={handleChange} />
          </FormControl>

          <div className="grid grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="aspect-square w-full rounded object-cover shadow" />
            ))}
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSubmit} disabled={processing}>
            {processing ? <Loader2 className="animate-spin" /> : <Upload />}
            Upload
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UploadImage;
