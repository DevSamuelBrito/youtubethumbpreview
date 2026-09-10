import { useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";

interface ThumbnailUploaderProps {
  onAdd: (file: File) => void;
}

export function ThumbnailUploader({ onAdd }: ThumbnailUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onAdd(file);
    event.target.value = "";
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="ghost"
        className="w-full justify-center border border-dashed border-neutral-300"
        onClick={() => inputRef.current?.click()}
      >
        + Adicionar thumbnail
      </Button>
    </div>
  );
}
