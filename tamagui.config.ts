import { themes } from './theme'
import { createTamagui, createFont, createTokens } from 'tamagui'
import { createAnimations } from '@tamagui/animations-react-native'

const headingFont = createFont({
  family: 'SpaceMono, Arial, sans-serif', // Use your loaded font family
  size: {
    1: 12,
    2: 14,
    3: 18,
    4: 22,
    5: 28,
    6: 36,
    7: 48,
    8: 64,
  },
  weight: {
    4: '400',
    6: '600',
    7: '700',
    8: '800',
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    4: 30,
    5: 38,
    6: 46,
    7: 58,
    8: 74,
  },
  face: {
    '400': { normal: 'SpaceMono-Regular' }, // Adjust font file names
    '700': { normal: 'SpaceMono-Bold' },   // Adjust font file names
  },
})


const tokens = createTokens({
size: {
    $true: 16, // Corrected: $ prefix
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 32,
    xl2: 40,
    xl3: 48,
    xl4: 56,
    xl5: 64,
  },
  space: {
    $true: 0, 
    sm: 8,
    '-sm': -8,
  },
  radius: {
    $true: 8,  // Corrected: $ prefix, and gave it a more common default
    0: 0,    // Often good to have a zero token
    none: 0,
    sm: 3,
    md: 8,
    lg: 12,
    xl: 20,
  },
  color: {
    white: "#ffffff",
    black: "#000000",
  },
  zIndex: { 
    $true: 0,
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  }
  });

export const tamaguiConfig = createTamagui({
  fonts: {
    heading: headingFont,
    body: headingFont
  },
  tokens: tokens,
  themes: themes,
   media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },

  shorthands: {
    // <View px={20} />
    px: 'paddingHorizontal',
  },
  settings: {
    disableSSR: true, // for client-side apps gains a bit of performance
  },
  animations: createAnimations({
    superfast: {
      damping: 40,
      mass: 1.4,
      stiffness: 300,
    },
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
  }),


})
export default tamaguiConfig;

type Conf = typeof tamaguiConfig;

// ensure types work
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
