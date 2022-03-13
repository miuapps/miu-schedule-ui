const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", ],
    theme: {
        colors: defaultTheme.colors,
        extend: {
            container: { center: true, padding: '4rem' },
            inset: { '0': 0, '1/2': '50%', '1/4': '25%', '1/8': '12.5%', '3/5': '60%', '1/5': '20%' },
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography')
    ],
}