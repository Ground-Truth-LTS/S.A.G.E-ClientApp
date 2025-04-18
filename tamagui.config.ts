import { defaultConfig } from '@tamagui/config/v4'
import { themes } from './theme'
import { createTamagui, createFont } from '@tamagui/core'
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
})

export const config = createTamagui({
  fonts: {
    heading: headingFont
    },
  // act like CSS variables at your root
  tokens: {
    // width="$sm"
    size: {    
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
    },
    // margin="$-sm"
    space: { '-sm': 8 },
    // radius="$none"
    radius: { none: 0, sm: 3 },
    color: { white: '#fff', black: '#000' },
  },

  themes: themes,

  // media query definitions can be used to style,
  // but also can be used with "groups" to do container queries by size:
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
    allowedStyleValues: 'somewhat-strict-web', // if targeting only web
  },

  animations: createAnimations({
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

type Conf = typeof config

// ensure types work
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;