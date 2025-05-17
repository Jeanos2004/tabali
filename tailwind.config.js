import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/hero-texture.png')",
        'dots-pattern': "url('/patterns/dots.png')",
        'hero-main': "url('/images/heroSection.jpg')",
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
      colors: {
        tabali: {
          primary: {
            DEFAULT: 'var(--tabali-primary)',
            light: 'var(--tabali-primary-light)',
            dark: 'var(--tabali-primary-dark)',
            50: 'var(--tabali-primary-50)',
            100: 'var(--tabali-primary-100)',
            200: 'var(--tabali-primary-200)',
            300: 'var(--tabali-primary-300)',
            400: 'var(--tabali-primary-400)',
            500: 'var(--tabali-primary-500)',
            600: 'var(--tabali-primary-600)',
            700: 'var(--tabali-primary-700)',
            800: 'var(--tabali-primary-800)',
            900: 'var(--tabali-primary-900)',
            950: 'var(--tabali-primary-950)',
          },
          secondary: {
            DEFAULT: 'var(--tabali-secondary)',
            light: 'var(--tabali-secondary-light)',
            dark: 'var(--tabali-secondary-dark)',
            50: 'var(--tabali-secondary-50)',
            100: 'var(--tabali-secondary-100)',
            200: 'var(--tabali-secondary-200)',
            300: 'var(--tabali-secondary-300)',
            400: 'var(--tabali-secondary-400)',
            500: 'var(--tabali-secondary-500)',
            600: 'var(--tabali-secondary-600)',
            700: 'var(--tabali-secondary-700)',
            800: 'var(--tabali-secondary-800)',
            900: 'var(--tabali-secondary-900)',
            950: 'var(--tabali-secondary-950)',
          },
          accent: {
            DEFAULT: 'var(--tabali-accent)',
            light: 'var(--tabali-accent-light)',
            dark: 'var(--tabali-accent-dark)',
            50: 'var(--tabali-accent-50)',
            100: 'var(--tabali-accent-100)',
            200: 'var(--tabali-accent-200)',
            300: 'var(--tabali-accent-300)',
            400: 'var(--tabali-accent-400)',
            500: 'var(--tabali-accent-500)',
            600: 'var(--tabali-accent-600)',
            700: 'var(--tabali-accent-700)',
            800: 'var(--tabali-accent-800)',
            900: 'var(--tabali-accent-900)',
            950: 'var(--tabali-accent-950)',
          },
          background: 'var(--tabali-background)',
          foreground: 'var(--tabali-foreground)',
          muted: {
            DEFAULT: 'var(--tabali-muted)',
            foreground: 'var(--tabali-muted-foreground)',
          },
          border: 'var(--tabali-border)',
          input: 'var(--tabali-input)',
          ring: 'var(--tabali-ring)',
          success: 'var(--tabali-success)',
          warning: 'var(--tabali-warning)',
          error: 'var(--tabali-error)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#008751", /* Vert Tabali */
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FCD116", /* Jaune Tabali */
          foreground: "#212529",
        },
        destructive: {
          DEFAULT: "#CE1126", /* Rouge Tabali */
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f8f9fa",
          foreground: "#6c757d",
        },
        accent: {
          DEFAULT: "#FCD116", /* Jaune Tabali comme accent */
          foreground: "#212529",
          800: "#655409",
          900: "#322a04",
          foreground: "#000000",
        },
        background: "#ffffff",
        foreground: "#212529",
        muted: "#f8f9fa",
        "muted-foreground": "#868e96",
        border: "#e9ecef",
        input: "#dee2e6",
      },
      borderRadius: {
        "sm": "0.125rem",
        DEFAULT: "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px",
        'tabali-sm': 'var(--tabali-radius-sm)',
        'tabali-md': 'var(--tabali-radius-md)',
        'tabali-lg': 'var(--tabali-radius-lg)',
        'tabali-xl': 'var(--tabali-radius-xl)',
      },
      boxShadow: {
        'tabali-sm': 'var(--tabali-shadow-sm)',
        'tabali-md': 'var(--tabali-shadow-md)',
        'tabali-lg': 'var(--tabali-shadow-lg)',
        'tabali-xl': 'var(--tabali-shadow-xl)',
      },
      fontFamily: {
        'tabali-sans': 'var(--tabali-font-sans)',
        'tabali-serif': 'var(--tabali-font-serif)',
        'tabali-mono': 'var(--tabali-font-mono)',
      },
      spacing: {
        'tabali-1': 'var(--tabali-spacing-1)',
        'tabali-2': 'var(--tabali-spacing-2)',
        'tabali-3': 'var(--tabali-spacing-3)',
        'tabali-4': 'var(--tabali-spacing-4)',
        'tabali-5': 'var(--tabali-spacing-5)',
        'tabali-6': 'var(--tabali-spacing-6)',
        'tabali-8': 'var(--tabali-spacing-8)',
        'tabali-10': 'var(--tabali-spacing-10)',
        'tabali-12': 'var(--tabali-spacing-12)',
        'tabali-16': 'var(--tabali-spacing-16)',
      },
      transitionProperty: {
        'tabali': 'var(--tabali-transition)',
        'tabali-fast': 'var(--tabali-transition-fast)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.05)'
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        '.text-shadow-md': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 15px 30px rgba(0, 0, 0, 0.11), 0 5px 15px rgba(0, 0, 0, 0.08)'
        },
        '.text-shadow-none': {
          'text-shadow': 'none'
        },
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.rotate-hover': {
          'transition': 'transform 0.3s ease',
          '&:hover': {
            'transform': 'rotate(3deg)'
          }
        },
        '.scale-hover': {
          'transition': 'transform 0.3s ease',
          '&:hover': {
            'transform': 'scale(1.05)'
          }
        },
      })
    }),
  ],
}
