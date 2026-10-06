/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/site/**/*.{js,jsx}', './src/main.jsx'],
  theme: {
    extend: {
      colors: {
        ink: '#0d110e',
        coal: '#161b17',
        chalk: '#f3f0e6',
        paper: '#e8e3d3',
        turf: '#1c5632',
        'turf-light': '#236a3e',
        'turf-dark': '#123c22',
        volt: '#d8ff3e',
        flare: '#ff5a1f',
        muted: '#6d7268',
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
