import type { VideoCardProps } from "./VideoCard";

export interface MockVideo extends VideoCardProps {
  id: string;
}

export const mockVideos: MockVideo[] = [
  {
    id: "1",
    title: "Como organizar sua rotina em 5 passos simples e práticos",
    channelName: "Canal Exemplo",
    views: "128 mil visualizações",
    uploadedAt: "há 2 dias",
    duration: "12:34",
    thumbnailGradient: "linear-gradient(135deg,#f97316,#ea580c)",
  },
  {
    id: "2",
    title: "Receita rápida para o café da manhã",
    channelName: "Cozinha Simples",
    views: "45 mil visualizações",
    uploadedAt: "há 5 horas",
    duration: "8:02",
    thumbnailGradient: "linear-gradient(135deg,#22c55e,#15803d)",
  },
  {
    id: "3",
    title: "Review completo: vale a pena em 2026?",
    channelName: "Tech Diário",
    views: "982 mil visualizações",
    uploadedAt: "há 1 semana",
    duration: "21:17",
    thumbnailGradient: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  },
  {
    id: "4",
    title: "Treino completo de 20 minutos sem equipamentos",
    channelName: "Vida Ativa",
    views: "310 mil visualizações",
    uploadedAt: "há 3 dias",
    duration: "20:00",
    thumbnailGradient: "linear-gradient(135deg,#ec4899,#be185d)",
  },
  {
    id: "5",
    title: "Como esse app mudou minha produtividade",
    channelName: "Produtividade Real",
    views: "76 mil visualizações",
    uploadedAt: "há 12 horas",
    duration: "9:48",
    thumbnailGradient: "linear-gradient(135deg,#a855f7,#7e22ce)",
  },
  {
    id: "6",
    title: "Viagem de carro pelo litoral: vale a pena?",
    channelName: "Mundo Afora",
    views: "1,2 mi visualizações",
    uploadedAt: "há 2 semanas",
    duration: "15:29",
    thumbnailGradient: "linear-gradient(135deg,#14b8a6,#0f766e)",
  },
  {
    id: "7",
    title: "Aprenda o básico em apenas 10 minutos",
    channelName: "Aprenda Já",
    views: "203 mil visualizações",
    uploadedAt: "há 4 dias",
    duration: "10:11",
    thumbnailGradient: "linear-gradient(135deg,#eab308,#a16207)",
  },
  {
    id: "8",
    title: "Montagem de setup completo gastando pouco",
    channelName: "Setup Gamer",
    views: "540 mil visualizações",
    uploadedAt: "há 6 dias",
    duration: "18:53",
    thumbnailGradient: "linear-gradient(135deg,#ef4444,#b91c1c)",
  },
];
