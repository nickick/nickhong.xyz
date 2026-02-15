import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "animate-[fadeIn_1s_both_0s]",
    "animate-[fadeIn_1s_both_0.0s]",
    "animate-[fadeIn_1s_both_0.2s]",
    "animate-[fadeIn_1s_both_0.4s]",
    "animate-[fadeIn_1s_both_0.6s]",
    "animate-[fadeIn_1s_both_0.8s]",
    "animate-[fadeIn_1s_both_1s]",
    "animate-[fadeIn_1s_both_1.0s]",
    "animate-[fadeIn_1s_both_1.2s]",
    "animate-[fadeIn_1s_both_1.4s]",
    "animate-[fadeIn_1s_both_1.6s]",
    "animate-[fadeIn_1s_both_1.8s]",
    "animate-[fadeIn_1s_both_2s]",
    "animate-[fadeIn_1s_both_2.0s]",
    "animate-[fadeIn_1s_both_2.2s]",
  ],
  theme: {
  	extend: {
  		boxShadow: {
  			inner: 'inset 0 0 10px 0 rgba(255,255,255,0.5)',
  			innerToBottom: 'inset 0 -1px 5px 0 rgba(255,255,255,0.5)',
  			innerToLeft: 'inset -1px 0 5px 0 rgba(255,255,255,0.5)',
  			innerToRight: 'inset 1px 0 5px 0 rgba(255,255,255,0.5)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			backgroundBlack: '#080808',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			wave: {
  				'0%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(15deg)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			bounceUp: {
  				'0%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					transform: 'translateY(0px)'
  				}
  			},
  			fadeInLogo: {
  				'0%': {
  					transform: 'scale(1.2) translateY(35vh) translateX(-30%)',
  					opacity: '0'
  				},
  				'70%': {
  					transform: 'scale(1.2) translateY(35vh) translateX(-50%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(1) translateY(5px) translateX(-50%)',
  					opacity: '1'
  				}
  			},
  			fadeFromBelow: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideFromLeft: {
  				'0%': {
  					transform: 'translateX(100px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(50%)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 1s both',
  			fadeInAfterDelay: 'fadeIn 1s both 1s',
  			fadeInFromLeftAfterDelay: 'slideFromLeft 1s both 1s',
  			wave: 'wave 3s infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
