import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)'],
        inter: ['var(--font-inter)'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-60px) rotate(0deg)', opacity: '0' },
          '5%': { opacity: '0.15' },
          '90%': { opacity: '0.1' },
          '100%': { transform: 'translateY(110vh) rotate(520deg)', opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'leaf-fall': 'leafFall linear infinite',
        'fade-up': 'fadeUp .55s ease both',
        shimmer: 'shimmer 3s linear infinite',
        blink: 'blink 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
