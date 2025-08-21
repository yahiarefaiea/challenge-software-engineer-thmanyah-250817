import type { Config } from 'tailwindcss';

type CustomTheme = NonNullable<Config['theme']>;
type ThemeColors = NonNullable<CustomTheme['colors']>;
type ThemeFontSize = NonNullable<CustomTheme['fontSize']>;
type ThemeFontFamily = NonNullable<CustomTheme['fontFamily']>;
type ThemeFontWeight = NonNullable<CustomTheme['fontWeight']>;
type ThemeLineHeight = NonNullable<CustomTheme['lineHeight']>;
type ThemeSpacing = NonNullable<CustomTheme['spacing']>;
type ThemeBorderRadius = NonNullable<CustomTheme['borderRadius']>;
type ThemeStrokeWidth = NonNullable<CustomTheme['strokeWidth']>;
type ThemeBorderWidth = NonNullable<CustomTheme['borderWidth']>;
type ThemeRingWidth = NonNullable<CustomTheme['ringWidth']>;
type ThemeScreens = NonNullable<CustomTheme['screens']>;

type SemanticTypography = Record<string, [string, string]>;

// Colors
export const colors: ThemeColors = {
  transparent: 'var(--color-transparent)',

  // Sugarcane
  sugarcane: {
    500: 'var(--color-sugarcane-500)',
    DEFAULT: 'var(--color-sugarcane-500)',
  },

  // Black
  black: {
    900: 'var(--color-black-900)',
    DEFAULT: 'var(--color-black-900)',
    700: 'var(--color-black-700)',
    500: 'var(--color-black-500)',
    300: 'var(--color-black-300)',
    200: 'var(--color-black-200)',
    100: 'var(--color-black-100)',
  },
};

// Font sizes
export const fontSize: ThemeFontSize = {
  xl: 'var(--font-size-xl)', // 18
  lg: 'var(--font-size-lg)', // 15
  base: 'var(--font-size-base)', // 14
  md: 'var(--font-size-md)', // 14
  sm: 'var(--font-size-sm)', // 13
};

// Line height
export const lineHeight: ThemeLineHeight = {
  200: 'var(--line-height-200)', // 28
  base: 'var(--line-height-base)', // 21
  150: 'var(--line-height-150)', // 21
  100: 'var(--line-height-100)', // 14
};

// Semantic: typography
export const semanticTypography: SemanticTypography = {
  h3: ['var(--h3-font-size)', 'var(--h3-line-height)'], // 18/28
  b1: ['var(--b1-font-size)', 'var(--b1-line-height)'], // 15/21
  b2: ['var(--b2-font-size)', 'var(--b2-line-height)'], // 14/21
  s1: ['var(--s1-font-size)', 'var(--s1-line-height)'], // 13/14
};

// Font family
export const fontFamily: ThemeFontFamily = {
  'ibm-plex-sans-arabic': ['var(--font-family-ibm-plex-sans-arabic)', 'sans-serif'], // IBM Plex Sans Arabic
};

// Font weights
export const fontWeight: ThemeFontWeight = {
  regular: 'var(--font-weight-regular)', // 400
  bold: 'var(--font-weight-bold)', // 600
};

// Spacing
export const spacing: ThemeSpacing = {
  0: 'var(--spacing-0)', // 0
  '0d25': 'var(--spacing-0d25)', // 3.5
  '0d28': 'var(--spacing-0d28)', // 4
  '0d50': 'var(--spacing-0d50)', // 7
  '0d75': 'var(--spacing-0d75)', // 10.5
  100: 'var(--spacing-100)', // 14
  150: 'var(--spacing-150)', // 21
  200: 'var(--spacing-200)', // 28
  250: 'var(--spacing-250)', // 35
  300: 'var(--spacing-300)', // 42
  400: 'var(--spacing-400)', // 56
  450: 'var(--spacing-450)', // 63
  500: 'var(--spacing-500)', // 70
  600: 'var(--spacing-600)', // 84
  700: 'var(--spacing-700)', // 98
  750: 'var(--spacing-750)', // 105
  800: 'var(--spacing-800)', // 112
  900: 'var(--spacing-900)', // 126
  1000: 'var(--spacing-1000)', // 140
  1200: 'var(--spacing-1200)', // 168
  1400: 'var(--spacing-1400)', // 196
  1500: 'var(--spacing-1500)', // 210
  1800: 'var(--spacing-1800)', // 252
};

// Border radius
export const borderRadius: ThemeBorderRadius = {
  0: 'var(--border-radius-0)', // 0
  '0d50': 'var(--border-radius-0d50)', // 7
  '0d75': 'var(--border-radius-0d75)', // 10.5
  100: 'var(--border-radius-100)', // 14
  175: 'var(--border-radius-175)', // 24.5
  full: 'var(--border-radius-full)', // 9999
  circle: 'var(--border-radius-circle)', // 50%
};

// Stroke width
export const strokeWidth: ThemeStrokeWidth = {
  0: 'var(--stroke-width-0)', // 0
  100: 'var(--stroke-width-100)', // 1.19
  150: 'var(--stroke-width-150)', // 1.5
  200: 'var(--stroke-width-200)', // 2
  300: 'var(--stroke-width-300)', // 3
};

// Border width
export const borderWidth: ThemeBorderWidth = {
  0: 'var(--border-width-0)', // 0
  100: 'var(--border-width-100)', // 1.19
  150: 'var(--border-width-150)', // 1.5
  200: 'var(--border-width-200)', // 2
  300: 'var(--border-width-300)', // 3
};

// Ring width
export const ringWidth: ThemeRingWidth = {
  0: 'var(--ring-width-0)', // 0
  100: 'var(--ring-width-100)', // 1.19
  150: 'var(--ring-width-150)', // 1.5
  200: 'var(--ring-width-200)', // 2
  300: 'var(--ring-width-300)', // 3
};

// Screens
export const screens: ThemeScreens = {
  '2xs': '400px', // 'var(--breakpoint-2xs)', // 400
  xs: '480px', // 'var(--breakpoint-xs)', // 480
  sm: '640px', // 'var(--breakpoint-sm)', // 640
  md: '768px', // 'var(--breakpoint-md)', // 768
  lg: '1024px', // 'var(--breakpoint-lg)', // 1024
  xl: '1280px', // 'var(--breakpoint-xl)', // 1280
  '2xl': '1536px', // 'var(--breakpoint-2xl)', // 1536
};

// Base Tailwind Config
const baseTailwindConfig: Config = {
  content: [],
  theme: {
    colors,
    fontSize: {
      ...fontSize,
      ...semanticTypography,
    },
    fontFamily,
    fontWeight,
    lineHeight,
    spacing,
    borderRadius,
    strokeWidth,
    borderWidth,
    ringWidth,
    screens,
  },
};

export default baseTailwindConfig;
