import { useRef, type ChangeEvent } from "react";

interface ChannelBannerUploaderProps {
  bannerUrl: string;
  onChange: (file: File) => void;
}

export function ChannelBannerUploader({
  bannerUrl,
  onChange,
}: ChannelBannerUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onChange(file);
    event.target.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-600">
        Capa do canal
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        aria-label="Alterar capa do canal"
        onClick={() => inputRef.current?.click()}
        style={{ aspectRatio: "6 / 1" }}
        className="relative flex w-full items-center justify-center overflow-hidden rounded-md bg-neutral-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]"
      >
        {bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
          <img
            src={bannerUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-medium text-neutral-500">
            Enviar imagem
          </span>
        )}
      </button>
    </div>
  );
}
