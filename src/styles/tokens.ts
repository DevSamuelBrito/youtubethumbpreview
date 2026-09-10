export const spacing = {
  headerHeight: "56px",
  sidebarWidth: "240px",
  gridGap: "16px",
  containerPaddingX: "24px",
} as const;

export const typography = {
  fontFamily: "var(--font-roboto), Roboto, Arial, sans-serif",
  title: { size: "14px", weight: 500, lineHeight: "20px" },
  channelName: { size: "12px", weight: 400, lineHeight: "18px" },
  metadata: { size: "12px", weight: 400, lineHeight: "18px" },
  navLabel: { size: "14px", weight: 500, lineHeight: "20px" },
} as const;

export const sizes = {
  thumbnailAspectRatio: "16 / 9",
  thumbnailRadius: "12px",
  avatarSize: "36px",
  avatarSizeCompact: "24px",
  cardRadius: "8px",
} as const;
