import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Elegant matte pastel green palette with improved contrast
				'deep-forest': '#0f1f0f',
				'sage-green': '#6b8e6b',
				'mint-matte': '#7fa67f',
				'forest-gray': '#2d3a2d',
				'pearl-white': '#f8f9f8',
				'moss-green': '#4a6741',
				'olive-matte': '#5c6b5c',
				// High contrast colors for better readability
				'cream-white': '#fdfef8',
				'soft-gray': '#e8eae8',
				'charcoal': '#1a1f1a',
				'warm-white': '#fcfcfa',
				'light-sage': '#a8bfa8',
				'dark-sage': '#3a4f3a',
				// Legacy aliases for compatibility - now with better contrast
				'cyber-lime': '#7fa67f',
				'neural-gray': '#2d3a2d',
				'quantum-silver': '#f8f9f8',
				'void-black': '#0f1f0f',
				'matrix-green': '#6b8e6b',
				'neon-cyan': '#7fa67f',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px #7fa67f, 0 0 40px #7fa67f, 0 0 60px #7fa67f'
					},
					'50%': {
						boxShadow: '0 0 10px #7fa67f, 0 0 20px #7fa67f, 0 0 30px #7fa67f'
					}
				},
				'particle-float': {
					'0%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-100px) rotate(360deg)',
						opacity: '0'
					}
				},
				'matrix-rain': {
					'0%': {
						transform: 'translateY(-100vh)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh)',
						opacity: '0'
					}
				},
				'glitch': {
					'0%': {
						transform: 'translate(0)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(-2px, -2px)'
					},
					'60%': {
						transform: 'translate(2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					},
					'100%': {
						transform: 'translate(0)'
					}
				},
				'holographic': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				},
				'cyber-scan': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'particle-float': 'particle-float 3s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 2s linear infinite',
				'glitch': 'glitch 0.3s ease-in-out infinite',
				'holographic': 'holographic 3s ease-in-out infinite',
				'cyber-scan': 'cyber-scan 2s ease-in-out infinite'
			},
			backgroundImage: {
				'cyber-gradient': 'linear-gradient(135deg, #0f1f0f, #2d3a2d, #4a6741)',
				'holographic': 'linear-gradient(45deg, #7fa67f, #6b8e6b, #7fa67f, #6b8e6b)',
				'neural-mesh': 'radial-gradient(circle at 20% 80%, #4a6741 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2d3a2d 0%, transparent 50%), radial-gradient(circle at 40% 40%, #7fa67f 0%, transparent 50%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
