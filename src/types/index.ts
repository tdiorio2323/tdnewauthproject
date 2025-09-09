export type ThemeOption = 'minimal' | 'gradient' | 'neon' | 'glass';
export type FontOption = 'inter' | 'playfair' | 'space-mono' | 'poppins';
export type ColorSchemeOption = 'purple-teal' | 'blue-pink' | 'green-yellow' | 'mono-white';
export type ButtonStyleOption = 'rounded' | 'sharp' | 'pill' | 'glow';
export type ButtonLayoutOption = 'stacked' | 'grid3x3';

export interface SectionToggles {
  imageBox: boolean;
  customText: boolean;
  bookingForm: boolean;
  shop: boolean;
  // Optional config values stored in sections JSON
  customTextContent?: string;
  imageUrl?: string;
  bookingEmail?: string;
  shopUrl?: string;
}

export interface LinkPagePrefs {
  theme: ThemeOption;
  font: FontOption;
  colorScheme: ColorSchemeOption;
  buttonStyle: ButtonStyleOption;
  buttonLayout: ButtonLayoutOption;
  sections: SectionToggles;
}

export interface LinkItem {
  id?: string;
  label: string;
  url: string;
  position: number;
}

