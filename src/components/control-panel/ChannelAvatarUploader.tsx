import { useRef, type ChangeEvent } from "react";

interface ChannelAvatarUploaderProps {
  avatarUrl: string;
  onChange: (file: File) => void;
}

export function ChannelAvatarUploader({
  avatarUrl,
  onChange,
}: ChannelAvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onChange(file);
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        aria-label="Alterar ícone do canal"
        onClick={() => inputRef.current?.click()}
        className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-neutral-400"
            fill="currentColor"
          >
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
          </svg>
        )}
      </button>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-neutral-600">
          Ícone do canal
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-left text-xs font-medium text-neutral-500 underline hover:text-neutral-900"
        >
          {avatarUrl ? "Alterar imagem" : "Enviar imagem"}
        </button>
      </div>
    </div>
  );
}
