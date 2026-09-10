import { YoutubePreview } from "@/components/youtube-preview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-app-bg p-6">
      <div className="h-200 w-full max-w-350">
        <YoutubePreview />
      </div>
    </div>
  );
}
