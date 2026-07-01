/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light & Dark mode colors using CSS variables
        bg: "var(--color-bg)",
        bgElevated: "var(--color-bg-elevated)",
        card: "var(--color-card)",
        cardBorder: "var(--color-card-border)",
        primary: {
          DEFAULT: "var(--color-primary)",
          muted: "var(--color-primary-muted)",
          light: "var(--color-primary-light)",
        },
        secondary: "var(--color-secondary)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textMuted: "var(--color-text-muted)",
        success: {
          DEFAULT: "var(--color-success)",
          muted: "var(--color-success-muted)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          muted: "var(--color-warning-muted)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          muted: "var(--color-danger-muted)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          muted: "var(--color-info-muted)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
