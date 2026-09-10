"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/Input";
import { ChannelAvatarUploader } from "./ChannelAvatarUploader";
import { ChannelBannerUploader } from "./ChannelBannerUploader";
import { generateLoremText } from "@/lib/utils";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
        open ? "rotate-90" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
    </svg>
  );
}

interface ChannelSettingsPanelProps {
  bannerUrl: string;
  onBannerChange: (file: File) => void;
  avatarUrl: string;
  onAvatarChange: (file: File) => void;
  channelName: string;
  onChannelNameChange: (value: string) => void;
  subscriberCount: string;
  onSubscriberCountChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

export function ChannelSettingsPanel({
  bannerUrl,
  onBannerChange,
  avatarUrl,
  onAvatarChange,
  channelName,
  onChannelNameChange,
  subscriberCount,
  onSubscriberCountChange,
  description,
  onDescriptionChange,
}: ChannelSettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 border-b border-neutral-200 pb-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900"
      >
        <ChevronIcon open={isOpen} />
        Opções do canal
      </button>

      {isOpen && (
        <div className="flex flex-col gap-3">
          <ChannelBannerUploader
            bannerUrl={bannerUrl}
            onChange={onBannerChange}
          />
          <ChannelAvatarUploader
            avatarUrl={avatarUrl}
            onChange={onAvatarChange}
          />
          <Input
            label="Nome do canal"
            placeholder="Nome do canal"
            value={channelName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChannelNameChange(event.target.value)
            }
          />
          <Input
            label="Inscritos"
            placeholder="1,2 mil inscritos"
            value={subscriberCount}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onSubscriberCountChange(event.target.value)
            }
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">
              Descrição do canal
            </span>
            <div className="relative">
              <Input
                placeholder="Descrição do canal"
                value={description}
                style={{ paddingRight: "2.25rem" }}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onDescriptionChange(event.target.value)
                }
              />
              <button
                type="button"
                aria-label="Preencher descrição com texto de exemplo"
                onClick={() => onDescriptionChange(generateLoremText())}
                className="absolute top-1/2 right-1.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-neutral-500 hover:bg-neutral-300 hover:text-neutral-900"
              >
                <SparkleIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
