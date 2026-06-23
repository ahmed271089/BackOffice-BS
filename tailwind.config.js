/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0E16',
        bgElevated: '#12151F',
        card: '#161A26',
        cardBorder: '#22273A',
        primary: {
          DEFAULT: '#6C5CE7',
          muted: '#2A2550',
          light: '#8B7CF6',
        },
        secondary: '#3B82F6',
        textPrimary: '#F4F5F8',
        textSecondary: '#9AA1B5',
        textMuted: '#5C6178',
        success: { DEFAULT: '#22C55E', muted: '#10301F' },
        warning: { DEFAULT: '#F59E0B', muted: '#3A2A0E' },
        danger: { DEFAULT: '#EF4444', muted: '#3A1414' },
        info: { DEFAULT: '#3B82F6', muted: '#142235' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '20px',
      },
    },
  },
  plugins: [],
};
