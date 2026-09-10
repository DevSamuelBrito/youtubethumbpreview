import { fakerPT_BR as faker } from "@faker-js/faker";
import type { VideoCardProps } from "./VideoCard";

export interface MockVideo extends VideoCardProps {
  id: string;
  description: string;
}

const MOCK_VIDEO_COUNT = 32;

faker.seed(1234);

function formatViews(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(".", ",")} mi visualizações`;
  }
  if (count >= 1_000) {
    return `${Math.round(count / 1000)} mil visualizações`;
  }
  return `${count} visualizações`;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);

  if (diffMinutes < 60) return `há ${diffMinutes} minutos`;
  if (diffHours < 24) return `há ${diffHours} horas`;
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffWeeks < 5) return `há ${diffWeeks} semanas`;
  return `há ${diffMonths} meses`;
}

const titleTemplates: Array<() => string> = [
  () =>
    `Como escolher ${faker.commerce.productName()} em ${faker.number.int({ min: 5, max: 40 })} minutos`,
  () => `${faker.commerce.productName()}: vale a pena em ${new Date().getFullYear()}?`,
  () => `Testei ${faker.commerce.productName()} por uma semana inteira`,
  () =>
    `${faker.number.int({ min: 3, max: 10 })} dicas essenciais sobre ${faker.commerce.department()}`,
  () => `Viagem para ${faker.location.city()}: vale a pena?`,
  () => `A verdade sobre ${faker.company.name()}`,
  () => `Review completo: ${faker.commerce.productName()}`,
  () => `Como economizar comprando ${faker.commerce.product()}`,
  () => `Montei um setup completo gastando pouco em ${faker.location.city()}`,
  () => `Aprenda ${faker.commerce.department()} do zero em uma aula só`,
];

export const mockVideos: MockVideo[] = Array.from(
  { length: MOCK_VIDEO_COUNT },
  (_, index) => {
    const id = `mock-${index}`;
    const titleTemplate =
      titleTemplates[faker.number.int({ min: 0, max: titleTemplates.length - 1 })];
    const views = faker.number.int({ min: 500, max: 5_000_000 });
    const durationSeconds = faker.number.int({ min: 60, max: 1500 });
    const uploadedAt = faker.date.recent({ days: 60 });
    const useCompanyName = faker.datatype.boolean();

    return {
      id,
      title: titleTemplate(),
      channelName: useCompanyName
        ? faker.company.name()
        : faker.internet.displayName(),
      channelAvatarUrl: `https://picsum.photos/seed/${id}-avatar/64/64`,
      views: formatViews(views),
      uploadedAt: formatRelativeTime(uploadedAt),
      duration: formatDuration(durationSeconds),
      thumbnailUrl: `https://picsum.photos/seed/${id}/400/225`,
      description: faker.lorem.sentences(2),
    };
  },
);
