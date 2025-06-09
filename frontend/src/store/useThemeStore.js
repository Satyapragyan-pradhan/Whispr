import { create } from 'zustand';

export const useThemeStore = create((set) => {
  const savedTheme =
    typeof window !== 'undefined'
      ? localStorage.getItem('chat-theme') || 'coffee'
      : 'coffee';

  // Ensure it's applied immediately
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  return {
    theme: savedTheme,
    setTheme: (theme) => {
      localStorage.setItem('chat-theme', theme);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      set({ theme });
    },
  };
});
