module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				pastelGreen: '#a4f6a5',
				pastelYellow: '#f1eb9a',
				yellowSolid: '#ffd615',
				pastelOrange: '#f8a978',
				pastelRed: '#f68787',
				pinkSecondary: '#f05c85',
				freshPink: '#FF427F',
				textTitle: '#36383c',
				bgSky: '#3494e6',
				bgPink: '#ec6ead',
				cardColor1: '#ba53de',
				cardColor2: '#88bef5',
				cardColor3: '#f4fa9c'
			},
			fontFamily: {
				friendlyWelcome: ['Josefin Sans', 'san-serif'],
				userInput: ['Mitr', 'san-serif'],
				readingFont: ['Kodchasan', 'sans-serif']
			},
			keyframes: {
				diagonal: {
					'0%, 100%': { transform: 'translateX(0) translateY(0)' },
					'50%': { transform: 'translateX(25%) translateY(-25%)' }
				}
			},
			animation: {
				diagonal: 'diagonal 1s ease-in-out infinite'
			},
			fill: (theme) => ({
				white: theme('colors.white')
			}),
			fontSize: {
				cramped: ['1rem', '1rem']
			}
		}
	},
	variants: {},
	plugins: []
	// future: {
	// 	purgeLayersByDefault: true,
	// 	removeDeprecatedGapUtilities: true
	// }
};
