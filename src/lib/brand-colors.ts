// CABANA Brand Colors - Based on latest brand identity
export const brandColors = {
  // Primary brand colors from logo
  primary: {
    navy: '#1B2951',        // Deep navy from logo
    purple: '#7B68EE',      // Bright purple from gradient
    lavender: '#B19CD9',    // Light lavender
    gold: '#F5B942',        // Golden yellow accent
    mint: '#C5E4B5',        // Mint green
    teal: '#4A9FBD',        // Teal blue gradient
    darkNavy: '#2B2D42',    // Dark navy for depth
  },
  
  // Holographic gradient combinations
  gradients: {
    primary: 'linear-gradient(135deg, #7B68EE 0%, #4A9FBD 50%, #F5B942 100%)',
    secondary: 'linear-gradient(90deg, #B19CD9 0%, #7B68EE 50%, #4A9FBD 100%)',
    accent: 'linear-gradient(45deg, #F5B942 0%, #C5E4B5 100%)',
    holographic: 'linear-gradient(135deg, #7B68EE 0%, #4A9FBD 25%, #F5B942 50%, #C5E4B5 75%, #B19CD9 100%)',
    neon: 'linear-gradient(90deg, #7B68EE 0%, #4A9FBD 50%, #7B68EE 100%)',
  },
  
  // Glass/backdrop effects
  glass: {
    background: 'rgba(123, 104, 238, 0.08)',      // Purple tint
    border: 'rgba(123, 104, 238, 0.2)',           // Purple border
    backdropBlur: 'blur(20px)',
    shadow: '0 8px 32px rgba(123, 104, 238, 0.3)',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    accent: '#F5B942',
  },
  
  // Background colors
  background: {
    dark: '#0A0B0F',           // Main dark background
    darkNavy: '#1B2951',       // Navy accent background
    card: 'rgba(255, 255, 255, 0.06)',
    cardHover: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Interactive states
  interactive: {
    hover: 'rgba(123, 104, 238, 0.15)',
    active: 'rgba(123, 104, 238, 0.25)',
    focus: 'rgba(123, 104, 238, 0.3)',
  },
  
  // Status colors
  status: {
    success: '#4ADE80',        // Green success
    error: '#F87171',          // Red error
    warning: '#FBBF24',        // Yellow warning
    info: '#60A5FA',           // Blue info
  }
};

// CSS custom properties for use in components
export const brandCSSVars = {
  '--brand-navy': brandColors.primary.navy,
  '--brand-purple': brandColors.primary.purple,
  '--brand-lavender': brandColors.primary.lavender,
  '--brand-gold': brandColors.primary.gold,
  '--brand-mint': brandColors.primary.mint,
  '--brand-teal': brandColors.primary.teal,
  '--brand-dark-navy': brandColors.primary.darkNavy,
  
  '--gradient-primary': brandColors.gradients.primary,
  '--gradient-secondary': brandColors.gradients.secondary,
  '--gradient-holographic': brandColors.gradients.holographic,
  
  '--glass-bg': brandColors.glass.background,
  '--glass-border': brandColors.glass.border,
  '--glass-shadow': brandColors.glass.shadow,
};

// Tailwind-compatible color extensions
export const tailwindBrandColors = {
  'brand-navy': '#1B2951',
  'brand-purple': '#7B68EE',
  'brand-lavender': '#B19CD9',
  'brand-gold': '#F5B942',
  'brand-mint': '#C5E4B5',
  'brand-teal': '#4A9FBD',
  'brand-dark-navy': '#2B2D42',
};