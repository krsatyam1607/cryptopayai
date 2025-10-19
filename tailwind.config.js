/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-600 with opacity */
        input: "var(--color-input)", /* gray-800 */
        ring: "var(--color-ring)", /* cyan-400 */
        background: "var(--color-background)", /* gray-950 */
        foreground: "var(--color-foreground)", /* gray-100 */
        surface: {
          DEFAULT: "var(--color-surface)", /* gray-800 */
          foreground: "var(--color-surface-foreground)", /* gray-100 */
        },
        primary: {
          DEFAULT: "var(--color-primary)", /* cyan-400 */
          foreground: "var(--color-primary-foreground)", /* gray-950 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* emerald-400 */
          foreground: "var(--color-secondary-foreground)", /* gray-950 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-500 */
          foreground: "var(--color-destructive-foreground)", /* gray-100 */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-700 */
          foreground: "var(--color-muted-foreground)", /* gray-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* cyan-600 */
          foreground: "var(--color-accent-foreground)", /* gray-100 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* gray-800 */
          foreground: "var(--color-popover-foreground)", /* gray-100 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-800 */
          foreground: "var(--color-card-foreground)", /* gray-100 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-500 */
          foreground: "var(--color-success-foreground)", /* gray-100 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* gray-950 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-500 */
          foreground: "var(--color-error-foreground)", /* gray-100 */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-base': 'clamp(0.875rem, 2.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1rem, 3vw, 1.25rem)',
        'fluid-xl': 'clamp(1.125rem, 3.5vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.25rem, 4vw, 2rem)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-emerald': '0 0 20px rgba(52, 211, 153, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'micro-bounce': 'micro-bounce 0.2s ease-in-out',
        'spring': 'spring 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'micro-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        spring: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}