import { defaultConfig } from '@tamagui/config/v4'
import { themes } from './theme'
import { createTamagui } from '@tamagui/core'

export const config = createTamagui({
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
})

type Conf = typeof config

// ensure types work
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;