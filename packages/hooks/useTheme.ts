import { Ref, ref, watchEffect } from 'vue';

export type Theme = 'light' | 'dark' | 'auto';

const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'auto');

const lightMedia = matchMedia('(prefers-color-scheme: light)');
const darkMedia = matchMedia('(prefers-color-scheme: dark)');

const themeChange = (e: MediaQueryListEvent | MediaQueryList) => {
  let currentTheme;
  switch (e.media) {
    case '(prefers-color-scheme: light)':
      if (e.matches) currentTheme = 'light';
      break;
    case '(prefers-color-scheme: dark)':
      if (e.matches) currentTheme = 'dark';
      break;
  }
  document.documentElement.dataset.theme = currentTheme;
};

const initTheme = () => {
  const style = document.createElement('style');
  style.innerHTML = '*{transition: none !important;}';
  document.head.appendChild(style);
  requestAnimationFrame(() => style.remove());
};
initTheme();

watchEffect(() => {
  if (theme.value === 'auto') {
    lightMedia.addEventListener('change', themeChange);
    darkMedia.addEventListener('change', themeChange);
  } else {
    lightMedia.removeEventListener('change', themeChange);
    darkMedia.removeEventListener('change', themeChange);
    document.documentElement.dataset.theme = theme.value;
  }
  localStorage.setItem('theme', theme.value);
});

export interface ThemeOption {
  label: '亮色' | '深色' | '自动';
  value: Theme;
}

export interface ThemeReturn {
  theme: Ref<Theme>;
  options: ThemeOption[];
}

export const useTheme = (): ThemeReturn => {
  return {
    theme,
    options: [
      { label: '自动', value: 'auto' },
      { label: '亮色', value: 'light' },
      { label: '深色', value: 'dark' },
    ],
  };
};
