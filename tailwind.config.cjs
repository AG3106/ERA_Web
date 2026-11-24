/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/site/**/*.{js,jsx}', './src/main.jsx'],
  theme: {
    extend: {
      colors: {
        // Night-stadium palette: navy sky (`ink`), floodlit white (`chalk`),
        // a real green pitch (`turf`) and ERA blue as the accent (`volt`).
        ink: '#0a0f1d',
        coal: '#121a2e',
        chalk: '#eef3fc',
        paper: '#e1e9f6',
        turf: '#1d5c35',
        'turf-light': '#236b3f',
        'turf-dark': '#133f24',
        volt: '#4a86ff',
        flare: '#ff5a1f',
        muted: '#68728a',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '420px',
      },
      maxWidth: {
        site: '1400px',
      },
    },
  },
  plugins: [],
};
