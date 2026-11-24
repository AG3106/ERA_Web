/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/site/**/*.{js,jsx}', './src/main.jsx'],
  theme: {
    extend: {
      colors: {
        // ERA blue palette. `volt` is the logo blue (#6195FE); `turf` is the
        // blue pitch used for RoboCup sections.
        ink: '#0a0f1d',
        coal: '#121a2e',
        chalk: '#eef3fc',
        paper: '#e1e9f6',
        turf: '#13336f',
        'turf-light': '#1a3f85',
        'turf-dark': '#0c2350',
        volt: '#6195fe',
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
