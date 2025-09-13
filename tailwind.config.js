/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        neonCyan: '#00fff7',
        electricPurple: '#a259ff',
        darkBg: {
          900: '#0a0a0a',
          800: '#0f0f10',
          700: '#121212',
        },
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,255,247,0.35), 0 0 40px rgba(162,89,255,0.25)',
        glass: '0 10px 30px rgba(0,0,0,0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1200px 600px at 50% 0%, rgba(162,89,255,0.10), transparent), radial-gradient(800px 400px at 80% 20%, rgba(0,255,247,0.08), transparent)',
      },
    },
  },
  plugins: [],
}
