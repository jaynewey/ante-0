export const jokerAssets = import.meta.glob('/src/assets/jokers/*.png', {
  eager: true,
  query: '?url',
}) as Record<string, { default: string }>
export const stickerAssets = import.meta.glob('/src/assets/stickers/*.png', {
  eager: true,
  query: '?url',
}) as Record<string, { default: string }>
