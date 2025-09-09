import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeType = 'minimal' | 'gradient' | 'neon' | 'glass';
export type FontType = 'inter' | 'playfair' | 'space-mono' | 'poppins';
export type ButtonStyleType = 'rounded' | 'sharp' | 'pill' | 'glow';
export type ButtonLayoutType = 'stacked' | 'grid3x3';
export type ColorSchemeType = 'purple-teal' | 'blue-pink' | 'green-yellow' | 'mono-white';
export type BackgroundPatternType = 'none' | 'dots' | 'grid' | 'waves';

export interface StylePreferences {
  theme: ThemeType;
  font: FontType;
  buttonStyle: ButtonStyleType;
  buttonLayout: ButtonLayoutType;
  colorScheme: ColorSchemeType;
  backgroundPattern: BackgroundPatternType;
  profileImage: string | null;
  socialHandle: string;
  sections: {
    imageBox: boolean;
    bookingForm: boolean;
    shop: boolean;
    customText: boolean;
  };
}

export interface ThemeConfig {
  background: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  minimal: {
    background: {
      primary: 'from-white to-gray-50',
      secondary: 'from-gray-100 to-white',
      accent: 'from-gray-200 to-gray-100'
    },
    fonts: {
      primary: 'font-sans',
      secondary: 'font-mono'
    },
    colors: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      accent: 'text-blue-600',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600'
    }
  },
  gradient: {
    background: {
      primary: 'from-purple-900 via-blue-900 to-teal-900',
      secondary: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20',
      accent: 'from-purple-500/10 to-teal-400/10'
    },
    fonts: {
      primary: 'font-sans',
      secondary: 'font-light'
    },
    colors: {
      primary: 'text-white',
      secondary: 'text-purple-200',
      accent: 'text-cyan-400',
      text: 'text-white',
      textSecondary: 'text-purple-300'
    }
  },
  neon: {
    background: {
      primary: 'from-black via-gray-900 to-black',
      secondary: 'from-green-500/10 via-cyan-500/10 to-pink-500/10',
      accent: 'from-green-400/20 to-cyan-400/20'
    },
    fonts: {
      primary: 'font-mono',
      secondary: 'font-bold'
    },
    colors: {
      primary: 'text-green-400',
      secondary: 'text-cyan-400',
      accent: 'text-pink-400',
      text: 'text-green-400',
      textSecondary: 'text-cyan-300'
    }
  },
  glass: {
    background: {
      primary: 'from-white/10 via-white/5 to-transparent',
      secondary: 'from-white/20 via-white/10 to-white/5',
      accent: 'from-white/30 to-white/10'
    },
    fonts: {
      primary: 'font-light',
      secondary: 'font-thin'
    },
    colors: {
      primary: 'text-white',
      secondary: 'text-white/80',
      accent: 'text-white/90',
      text: 'text-white',
      textSecondary: 'text-white/70'
    }
  }
};

export const FONTS = [
  { id: 'inter', name: 'Inter', class: 'font-sans' },
  { id: 'playfair', name: 'Playfair', class: 'font-serif' },
  { id: 'space-mono', name: 'Space Mono', class: 'font-mono' },
  { id: 'poppins', name: 'Poppins', class: 'font-sans' }
] as const;

export const COLOR_SCHEMES = [
  { id: 'purple-teal', colors: ['from-purple-500', 'to-teal-400'], accent: 'purple-500' },
  { id: 'blue-pink', colors: ['from-blue-500', 'to-pink-500'], accent: 'blue-500' },
  { id: 'green-yellow', colors: ['from-green-400', 'to-yellow-400'], accent: 'green-400' },
  { id: 'mono-white', colors: ['from-white', 'to-gray-300'], accent: 'gray-600' }
] as const;

interface ThemeContextType {
  preferences: StylePreferences;
  updatePreferences: (updates: Partial<StylePreferences>) => void;
  currentTheme: ThemeConfig;
  resetToDefaults: () => void;
}

const defaultPreferences: StylePreferences = {
  theme: 'gradient',
  font: 'inter',
  buttonStyle: 'rounded',
  buttonLayout: 'stacked',
  colorScheme: 'purple-teal',
  backgroundPattern: 'none',
  profileImage: 'sparkle',
  socialHandle: '',
  sections: {
    imageBox: false,
    bookingForm: false,
    shop: false,
    customText: false
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<StylePreferences>(defaultPreferences);

  const updatePreferences = (updates: Partial<StylePreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setPreferences(defaultPreferences);
  };

  const currentTheme = THEMES[preferences.theme];

  return (
    <ThemeContext.Provider value={{
      preferences,
      updatePreferences,
      currentTheme,
      resetToDefaults
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}