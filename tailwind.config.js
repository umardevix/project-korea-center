/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-black': '#000000',
        'regal-text-black': '#212529',
        'regal-red': '#E11E24',
        'regal-grey': '#6C757D',
        'regal-green': '#55BB00',
        'regal-opacity': '#595959',
        'regal-placeholder': '#999999',
        'regal-white': '#FFFFFF',
        'regal-global-gray': '#9D9D9D',
        'bg-blue': '#3E6AE1',
        'bg-green': '#55BB00',
        'border-pogination': '#595959',
        'border-pogination-hover': '#DEE2E6',
        'regal-pogination': '#ACACAC',
        'bg-body': '#F6F3F4',
        'regal-border': '#A1A1A1',
        'regal-span-opacity': '#00000080',
        'regal-fixed': '#00000080',
        'bg-fiexed': '#00000080'

      },

      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '834px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      boxShadow: {
        'custom1': '0 0 25px 5px #3E6AE1',
        'red-shadow': '0px 0px 25px 5px #E11E2440',
        'blue-shadow': '0px 0px 25px 5px #007FFF'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}

