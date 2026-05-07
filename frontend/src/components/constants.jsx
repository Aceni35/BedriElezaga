// constants.jsx — shared icons + reusable class strings

const ICONS = {
  arrowRight: 'M5 12h14M13 5l7 7-7 7',
  arrowDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  x: 'M6 6l12 12M6 18L18 6',
  menu: 'M3 6h18M3 12h18M3 18h18',
  mail: 'M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
  pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  book: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5v-15z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  sparkle: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z',
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  instagram: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8a4 4 0 100 8 4 4 0 000-8zM17.5 6.5h.01',
  youtube: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z',
};

const CX = {
  container: 'max-w-[1240px] mx-auto px-5 sm:px-8',
  btnPrimary: 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary-deep hover:-translate-y-px hover:shadow-md transition-all',
  btnGhost: 'inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-line-strong text-ink hover:bg-surface hover:border-primary hover:text-primary transition-all',
  btnLink: 'inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-deep group transition-colors',
  eyebrow: 'eyebrow inline-flex items-center text-[12px] font-semibold uppercase tracking-[.14em] text-primary',
  chip: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-line text-xs text-ink-soft font-medium',
  chipClickable: 'cursor-pointer transition-all hover:border-primary hover:text-primary',
  chipActive: '!bg-primary !text-white !border-primary hover:!bg-primary hover:!text-white',
};

export { ICONS, CX };
