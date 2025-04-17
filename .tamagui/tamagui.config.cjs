var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tamagui.config.ts
var tamagui_config_exports = {};
__export(tamagui_config_exports, {
  config: () => config,
  default: () => tamagui_config_default
});
module.exports = __toCommonJS(tamagui_config_exports);

// node_modules/@tamagui/create-theme/dist/esm/isMinusZero.mjs
function isMinusZero(value) {
  return 1 / value === Number.NEGATIVE_INFINITY;
}
__name(isMinusZero, "isMinusZero");

// node_modules/@tamagui/create-theme/dist/esm/themeInfo.mjs
var THEME_INFO = /* @__PURE__ */ new Map();
var getThemeInfo = /* @__PURE__ */ __name((theme, name) => THEME_INFO.get(name || JSON.stringify(theme)), "getThemeInfo");
var setThemeInfo = /* @__PURE__ */ __name((theme, info) => {
  const next = {
    ...info,
    cache: /* @__PURE__ */ new Map()
  };
  THEME_INFO.set(info.name || JSON.stringify(theme), next), THEME_INFO.set(JSON.stringify(info.definition), next);
}, "setThemeInfo");

// node_modules/@tamagui/create-theme/dist/esm/createTheme.mjs
var identityCache = /* @__PURE__ */ new Map();
function createThemeWithPalettes(palettes, defaultPalette, definition, options, name, skipCache = false) {
  if (!palettes[defaultPalette]) throw new Error(`No pallete: ${defaultPalette}`);
  const newDef = {
    ...definition
  };
  for (const key in definition) {
    let val = definition[key];
    if (typeof val == "string" && val[0] === "$") {
      const [altPaletteName$, altPaletteIndex] = val.split("."), altPaletteName = altPaletteName$.slice(1), parentName = defaultPalette.split("_")[0], altPalette = palettes[altPaletteName] || palettes[`${parentName}_${altPaletteName}`];
      if (altPalette) {
        const next = getValue(altPalette, +altPaletteIndex);
        typeof next < "u" && (newDef[key] = next);
      }
    }
  }
  return createTheme(palettes[defaultPalette], newDef, options, name, skipCache);
}
__name(createThemeWithPalettes, "createThemeWithPalettes");
function createTheme(palette, definition, options, name, skipCache = false) {
  const cacheKey = skipCache ? "" : JSON.stringify([name, palette, definition, options]);
  if (!skipCache && identityCache.has(cacheKey)) return identityCache.get(cacheKey);
  const theme = {
    ...Object.fromEntries(Object.entries(definition).map(([key, offset]) => [key, getValue(palette, offset)])),
    ...options?.nonInheritedValues
  };
  return setThemeInfo(theme, {
    palette,
    definition,
    options,
    name
  }), cacheKey && identityCache.set(cacheKey, theme), theme;
}
__name(createTheme, "createTheme");
var getValue = /* @__PURE__ */ __name((palette, value) => {
  if (!palette) throw new Error("No palette!");
  if (typeof value == "string") return value;
  const max = palette.length - 1, next = (value === 0 ? !isMinusZero(value) : value >= 0) ? value : max + value, index = Math.min(Math.max(0, next), max);
  return palette[index];
}, "getValue");

// node_modules/@tamagui/create-theme/dist/esm/helpers.mjs
function objectEntries(obj) {
  return Object.entries(obj);
}
__name(objectEntries, "objectEntries");
function objectFromEntries(arr) {
  return Object.fromEntries(arr);
}
__name(objectFromEntries, "objectFromEntries");

// node_modules/@tamagui/create-theme/dist/esm/masks.mjs
var createMask = /* @__PURE__ */ __name((createMask2) => typeof createMask2 == "function" ? {
  name: createMask2.name || "unnamed",
  mask: createMask2
} : createMask2, "createMask");
var skipMask = {
  name: "skip-mask",
  mask: /* @__PURE__ */ __name((template, opts) => {
    const {
      skip
    } = opts;
    return Object.fromEntries(Object.entries(template).filter(([k]) => !skip || !(k in skip)).map(([k, v]) => [k, applyOverrides(k, v, opts)]));
  }, "mask")
};
function applyOverrides(key, value, opts) {
  let override, strategy = opts.overrideStrategy;
  const overrideSwap = opts.overrideSwap?.[key];
  if (typeof overrideSwap < "u") override = overrideSwap, strategy = "swap";
  else {
    const overrideShift = opts.overrideShift?.[key];
    if (typeof overrideShift < "u") override = overrideShift, strategy = "shift";
    else {
      const overrideDefault = opts.override?.[key];
      typeof overrideDefault < "u" && (override = overrideDefault, strategy = opts.overrideStrategy);
    }
  }
  return typeof override > "u" || typeof override == "string" ? value : strategy === "swap" ? override : value;
}
__name(applyOverrides, "applyOverrides");
var createIdentityMask = /* @__PURE__ */ __name(() => ({
  name: "identity-mask",
  mask: /* @__PURE__ */ __name((template, opts) => skipMask.mask(template, opts), "mask")
}), "createIdentityMask");
var createInverseMask = /* @__PURE__ */ __name(() => ({
  name: "inverse-mask",
  mask: /* @__PURE__ */ __name((template, opts) => {
    const inversed = objectFromEntries(objectEntries(template).map(([k, v]) => [k, -v]));
    return skipMask.mask(inversed, opts);
  }, "mask")
}), "createInverseMask");
var createShiftMask = /* @__PURE__ */ __name(({
  inverse
} = {}, defaultOptions) => ({
  name: "shift-mask",
  mask: /* @__PURE__ */ __name((template, opts) => {
    const {
      override,
      overrideStrategy = "shift",
      max: maxIn,
      palette,
      min = 0,
      strength = 1
    } = {
      ...defaultOptions,
      ...opts
    }, values = Object.entries(template), max = maxIn ?? (palette ? Object.values(palette).length - 1 : Number.POSITIVE_INFINITY), out = {};
    for (const [key, value] of values) {
      if (typeof value == "string") continue;
      if (typeof override?.[key] == "number") {
        const overrideVal = override[key];
        out[key] = overrideStrategy === "shift" ? value + overrideVal : overrideVal;
        continue;
      }
      if (typeof override?.[key] == "string") {
        out[key] = override[key];
        continue;
      }
      const isPositive = value === 0 ? !isMinusZero(value) : value >= 0, direction = isPositive ? 1 : -1, invert = inverse ? -1 : 1, next = value + strength * direction * invert, clamped = isPositive ? Math.max(min, Math.min(max, next)) : Math.min(-min, Math.max(-max, next));
      out[key] = clamped;
    }
    return skipMask.mask(out, opts);
  }, "mask")
}), "createShiftMask");
var createWeakenMask = /* @__PURE__ */ __name((defaultOptions) => ({
  name: "soften-mask",
  mask: createShiftMask({}, defaultOptions).mask
}), "createWeakenMask");
var createSoftenMask = createWeakenMask;
var createStrengthenMask = /* @__PURE__ */ __name((defaultOptions) => ({
  name: "strengthen-mask",
  mask: createShiftMask({
    inverse: true
  }, defaultOptions).mask
}), "createStrengthenMask");

// node_modules/@tamagui/create-theme/dist/esm/applyMask.mjs
function applyMask(theme, mask, options = {}, parentName, nextName) {
  const info = getThemeInfo(theme, parentName);
  if (!info) throw new Error(process.env.NODE_ENV !== "production" ? "No info found for theme, you must pass the theme created by createThemeFromPalette directly to extendTheme" : "\u274C Err2");
  const next = applyMaskStateless(info, mask, options, parentName);
  return setThemeInfo(next.theme, {
    definition: next.definition,
    palette: info.palette,
    name: nextName
  }), next.theme;
}
__name(applyMask, "applyMask");
function applyMaskStateless(info, mask, options = {}, parentName) {
  const skip = {
    ...options.skip
  };
  if (info.options?.nonInheritedValues) for (const key in info.options.nonInheritedValues) skip[key] = 1;
  const maskOptions = {
    parentName,
    palette: info.palette,
    ...options,
    skip
  }, template = mask.mask(info.definition, maskOptions), theme = createTheme(info.palette, template);
  return {
    ...info,
    cache: /* @__PURE__ */ new Map(),
    definition: template,
    theme
  };
}
__name(applyMaskStateless, "applyMaskStateless");

// node_modules/@tamagui/create-theme/dist/esm/combineMasks.mjs
var combineMasks = /* @__PURE__ */ __name((...masks2) => ({
  name: "combine-mask",
  mask: /* @__PURE__ */ __name((template, opts) => {
    let current = getThemeInfo(template, opts.parentName), theme;
    for (const mask2 of masks2) {
      if (!current) throw new Error(`Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(opts, null, 2)}`);
      const next = applyMaskStateless(current, mask2, opts);
      current = next, theme = next.theme;
    }
    return theme;
  }, "mask")
}), "combineMasks");

// node_modules/@tamagui/theme-builder/dist/esm/ThemeBuilder.mjs
var ThemeBuilder = class {
  static {
    __name(this, "ThemeBuilder");
  }
  constructor(state) {
    this.state = state;
  }
  addPalettes(palettes) {
    return this.state.palettes = {
      // as {} prevents generic string key merge messing up types
      ...this.state.palettes,
      ...palettes
    }, this;
  }
  addTemplates(templates) {
    return this.state.templates = {
      // as {} prevents generic string key merge messing up types
      ...this.state.templates,
      ...templates
    }, this;
  }
  addMasks(masks2) {
    return this.state.masks = {
      // as {} prevents generic string key merge messing up types
      ...this.state.masks,
      ...objectFromEntries(objectEntries(masks2).map(([key, val]) => [key, createMask(val)]))
    }, this;
  }
  // for dev mode only really
  _addedThemes = [];
  addThemes(themes2) {
    return this._addedThemes.push({
      type: "themes",
      args: [themes2]
    }), this.state.themes = {
      // as {} prevents generic string key merge messing up types
      ...this.state.themes,
      ...themes2
    }, this;
  }
  // these wont be typed to save some complexity and because they don't need to be typed!
  addComponentThemes(childThemeDefinition, options) {
    return this.addChildThemes(childThemeDefinition, options), this;
  }
  addChildThemes(childThemeDefinition, options) {
    const currentThemes = this.state.themes;
    if (!currentThemes) throw new Error("No themes defined yet, use addThemes first to set your base themes");
    this._addedThemes.push({
      type: "childThemes",
      args: [childThemeDefinition, options]
    });
    const currentThemeNames = Object.keys(currentThemes), incomingThemeNames = Object.keys(childThemeDefinition), namesWithDefinitions = currentThemeNames.flatMap((prefix) => {
      const avoidNestingWithin = options?.avoidNestingWithin;
      return avoidNestingWithin && avoidNestingWithin.some((avoidName) => prefix.startsWith(avoidName) || prefix.endsWith(avoidName)) ? [] : incomingThemeNames.map((subName) => {
        const fullName = `${prefix}_${subName}`, definition = childThemeDefinition[subName];
        return "avoidNestingWithin" in definition && definition.avoidNestingWithin.some((name) => prefix.startsWith(name) || prefix.endsWith(name)) ? null : [fullName, definition];
      }).filter(Boolean);
    }), childThemes = Object.fromEntries(namesWithDefinitions), next = {
      // as {} prevents generic string key merge messing up types
      ...this.state.themes,
      ...childThemes
    };
    return this.state.themes = next, this;
  }
  build() {
    if (!this.state.themes) return {};
    const out = {}, maskedThemes = [];
    for (const themeName in this.state.themes) {
      const nameParts = themeName.split("_"), parentName = nameParts.slice(0, nameParts.length - 1).join("_"), definitions = this.state.themes[themeName], themeDefinition = Array.isArray(definitions) ? (() => {
        const found = definitions.find(
          // endWith match stronger than startsWith
          (d) => d.parent ? parentName.endsWith(d.parent) || parentName.startsWith(d.parent) : true
        );
        return found || null;
      })() : definitions;
      if (themeDefinition) if ("theme" in themeDefinition) out[themeName] = themeDefinition.theme;
      else if ("mask" in themeDefinition) maskedThemes.push({
        parentName,
        themeName,
        mask: themeDefinition
      });
      else {
        let {
          palette: paletteName = "",
          template: templateName,
          ...options
        } = themeDefinition;
        const parentDefinition = this.state.themes[parentName];
        if (!this.state.palettes) throw new Error(`No palettes defined for theme with palette expected: ${themeName}`);
        let palette = this.state.palettes[paletteName || ""], attemptParentName = `${parentName}_${paletteName}`;
        for (; !palette && attemptParentName; ) attemptParentName in this.state.palettes ? (palette = this.state.palettes[attemptParentName], paletteName = attemptParentName) : attemptParentName = attemptParentName.split("_").slice(0, -1).join("_");
        if (!palette) {
          const msg = process.env.NODE_ENV !== "production" ? `: ${themeName}: ${paletteName}
          Definition: ${JSON.stringify(themeDefinition)}
          Parent: ${JSON.stringify(parentDefinition)}
          Potential: (${Object.keys(this.state.palettes).join(", ")})` : "";
          throw new Error(`No palette for theme${msg}`);
        }
        const template = this.state.templates?.[templateName] ?? // fall back to finding the scheme specific on if it exists
        this.state.templates?.[`${nameParts[0]}_${templateName}`];
        if (!template) throw new Error(`No template for theme ${themeName}: ${templateName} in templates:
- ${Object.keys(this.state.templates || {}).join(`
 - `)}`);
        out[themeName] = createThemeWithPalettes(this.state.palettes, paletteName, template, options, themeName, true);
      }
    }
    for (const {
      mask,
      themeName,
      parentName
    } of maskedThemes) {
      const parent = out[parentName];
      if (!parent) continue;
      const {
        mask: maskName,
        ...options
      } = mask;
      let maskFunction = this.state.masks?.[maskName];
      if (!maskFunction) throw new Error(`No mask ${maskName}`);
      const parentTheme = this.state.themes[parentName];
      if (parentTheme && "childOptions" in parentTheme) {
        const {
          mask: mask2,
          ...childOpts
        } = parentTheme.childOptions;
        mask2 && (maskFunction = this.state.masks?.[mask2]), Object.assign(options, childOpts);
      }
      out[themeName] = applyMask(parent, maskFunction, options, parentName, themeName);
    }
    return out;
  }
};
function createThemeBuilder() {
  return new ThemeBuilder({});
}
__name(createThemeBuilder, "createThemeBuilder");

// node_modules/color2k/dist/index.exports.import.es.mjs
function guard(low, high, value) {
  return Math.min(Math.max(low, value), high);
}
__name(guard, "guard");
var ColorError = class extends Error {
  static {
    __name(this, "ColorError");
  }
  constructor(color) {
    super(`Failed to parse color: "${color}"`);
  }
};
var ColorError$1 = ColorError;
function parseToRgba(color) {
  if (typeof color !== "string") throw new ColorError$1(color);
  if (color.trim().toLowerCase() === "transparent") return [0, 0, 0, 0];
  let normalizedColor = color.trim();
  normalizedColor = namedColorRegex.test(color) ? nameToHex(color) : color;
  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(r(x, 2), 16)), parseInt(r(arr[3] || "f", 2), 16) / 255];
  }
  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 16)), parseInt(arr[3] || "ff", 16) / 255];
  }
  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 10)), parseFloat(arr[3] || "1")];
  }
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s) throw new ColorError$1(color);
    if (guard(0, 100, l) !== l) throw new ColorError$1(color);
    return [...hslToRgb(h, s, l), Number.isNaN(a) ? 1 : a];
  }
  throw new ColorError$1(color);
}
__name(parseToRgba, "parseToRgba");
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i) {
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  }
  return (hash2 >>> 0) % 2341;
}
__name(hash, "hash");
var colorToInt = /* @__PURE__ */ __name((x) => parseInt(x.replace(/_/g, ""), 36), "colorToInt");
var compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
  const key = colorToInt(next.substring(0, 3));
  const hex = colorToInt(next.substring(3)).toString(16);
  let prefix = "";
  for (let i = 0; i < 6 - hex.length; i++) {
    prefix += "0";
  }
  acc[key] = `${prefix}${hex}`;
  return acc;
}, {});
function nameToHex(color) {
  const normalizedColorName = color.toLowerCase().trim();
  const result = compressedColorMap[hash(normalizedColorName)];
  if (!result) throw new ColorError$1(color);
  return `#${result}`;
}
__name(nameToHex, "nameToHex");
var r = /* @__PURE__ */ __name((str, amount) => Array.from(Array(amount)).map(() => str).join(""), "r");
var reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
var hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
var rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
var hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
var namedColorRegex = /^[a-z]+$/i;
var roundColor = /* @__PURE__ */ __name((color) => {
  return Math.round(color * 255);
}, "roundColor");
var hslToRgb = /* @__PURE__ */ __name((hue, saturation, lightness) => {
  let l = lightness / 100;
  if (saturation === 0) {
    return [l, l, l].map(roundColor);
  }
  const huePrime = (hue % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
  const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  let red3 = 0;
  let green3 = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red3 = chroma;
    green3 = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red3 = secondComponent;
    green3 = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green3 = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green3 = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red3 = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red3 = chroma;
    blue = secondComponent;
  }
  const lightnessModification = l - chroma / 2;
  const finalRed = red3 + lightnessModification;
  const finalGreen = green3 + lightnessModification;
  const finalBlue = blue + lightnessModification;
  return [finalRed, finalGreen, finalBlue].map(roundColor);
}, "hslToRgb");
function parseToHsla(color) {
  const [red3, green3, blue, alpha] = parseToRgba(color).map((value, index) => (
    // 3rd index is alpha channel which is already normalized
    index === 3 ? value : value / 255
  ));
  const max = Math.max(red3, green3, blue);
  const min = Math.min(red3, green3, blue);
  const lightness = (max + min) / 2;
  if (max === min) return [0, 0, lightness, alpha];
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const hue = 60 * (red3 === max ? (green3 - blue) / delta + (green3 < blue ? 6 : 0) : green3 === max ? (blue - red3) / delta + 2 : (red3 - green3) / delta + 4);
  return [hue, saturation, lightness, alpha];
}
__name(parseToHsla, "parseToHsla");
function hsla(hue, saturation, lightness, alpha) {
  return `hsla(${(hue % 360).toFixed()}, ${guard(0, 100, saturation * 100).toFixed()}%, ${guard(0, 100, lightness * 100).toFixed()}%, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`;
}
__name(hsla, "hsla");

// node_modules/@tamagui/theme-builder/dist/esm/defaultComponentThemes.mjs
var defaultComponentThemes = {
  ListItem: {
    template: "surface1"
  },
  SelectTrigger: {
    template: "surface1"
  },
  Card: {
    template: "surface1"
  },
  Button: {
    template: "surface3"
  },
  Checkbox: {
    template: "surface2"
  },
  Switch: {
    template: "surface2"
  },
  SwitchThumb: {
    template: "inverse"
  },
  TooltipContent: {
    template: "surface2"
  },
  Progress: {
    template: "surface1"
  },
  RadioGroupItem: {
    template: "surface2"
  },
  TooltipArrow: {
    template: "surface1"
  },
  SliderTrackActive: {
    template: "surface3"
  },
  SliderTrack: {
    template: "surface1"
  },
  SliderThumb: {
    template: "inverse"
  },
  Tooltip: {
    template: "inverse"
  },
  ProgressIndicator: {
    template: "inverse"
  },
  Input: {
    template: "surface1"
  },
  TextArea: {
    template: "surface1"
  }
};

// node_modules/@tamagui/theme-builder/dist/esm/helpers.mjs
var objectKeys = /* @__PURE__ */ __name((obj) => Object.keys(obj), "objectKeys");
function objectFromEntries2(arr) {
  return Object.fromEntries(arr);
}
__name(objectFromEntries2, "objectFromEntries");

// node_modules/@tamagui/theme-builder/dist/esm/defaultTemplates.mjs
var getTemplates = /* @__PURE__ */ __name(() => {
  const lightTemplates = getBaseTemplates("light"), darkTemplates = getBaseTemplates("dark");
  return {
    ...objectFromEntries2(objectKeys(lightTemplates).map((name) => [`light_${name}`, lightTemplates[name]])),
    ...objectFromEntries2(objectKeys(darkTemplates).map((name) => [`dark_${name}`, darkTemplates[name]]))
  };
}, "getTemplates");
var getBaseTemplates = /* @__PURE__ */ __name((scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 1,
    backgroundHover: base.backgroundHover + 1,
    backgroundPress: base.backgroundPress + 1,
    backgroundFocus: base.backgroundFocus + 1,
    borderColor: base.borderColor + 1,
    borderColorHover: base.borderColorHover + 1,
    borderColorFocus: base.borderColorFocus + 1,
    borderColorPress: base.borderColorPress + 1
  }, surface2 = {
    ...baseColors,
    background: base.background + 2,
    backgroundHover: base.backgroundHover + 2,
    backgroundPress: base.backgroundPress + 2,
    backgroundFocus: base.backgroundFocus + 2,
    borderColor: base.borderColor + 2,
    borderColorHover: base.borderColorHover + 2,
    borderColorFocus: base.borderColorFocus + 2,
    borderColorPress: base.borderColorPress + 2
  }, surface3 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [key, -index]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
}, "getBaseTemplates");
var defaultTemplates = getTemplates();

// node_modules/@tamagui/theme-builder/dist/esm/getThemeSuitePalettes.mjs
var paletteSize = 12;
var PALETTE_BACKGROUND_OFFSET = 6;
var generateColorPalette = /* @__PURE__ */ __name(({
  palette: buildPalette,
  scheme
}) => {
  if (!buildPalette) return [];
  const {
    anchors
  } = buildPalette;
  let palette = [];
  const add = /* @__PURE__ */ __name((h, s, l) => {
    palette.push(hsla(h, s, l, 1));
  }, "add"), numAnchors = Object.keys(anchors).length;
  for (const [anchorIndex, anchor] of anchors.entries()) {
    const [h, s, l] = [anchor.hue[scheme], anchor.sat[scheme], anchor.lum[scheme]];
    if (anchorIndex !== 0) {
      const lastAnchor = anchors[anchorIndex - 1], steps = anchor.index - lastAnchor.index, lastHue = lastAnchor.hue[scheme], lastSat = lastAnchor.sat[scheme], lastLum = lastAnchor.lum[scheme], stepHue = (lastHue - h) / steps, stepSat = (lastSat - s) / steps, stepLum = (lastLum - l) / steps;
      for (let step = lastAnchor.index + 1; step < anchor.index; step++) {
        const str = anchor.index - step;
        add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
      }
    }
    if (add(h, s, l), anchorIndex === numAnchors - 1 && palette.length < paletteSize) for (let step = anchor.index + 1; step < paletteSize; step++) add(h, s, l);
  }
  const background = palette[0], foreground = palette[palette.length - 1], transparentValues = [background, foreground].map((color) => {
    const [h, s, l] = parseToHsla(color);
    return [hsla(h, s, l, 0), hsla(h, s, l, 0.2), hsla(h, s, l, 0.4), hsla(h, s, l, 0.6), hsla(h, s, l, 0.8)];
  }), reverseForeground = [...transparentValues[1]].reverse();
  return palette = [...transparentValues[0], ...palette, ...reverseForeground], palette;
}, "generateColorPalette");
function getThemeSuitePalettes(palette) {
  return {
    light: generateColorPalette({
      palette,
      scheme: "light"
    }),
    dark: generateColorPalette({
      palette,
      scheme: "dark"
    })
  };
}
__name(getThemeSuitePalettes, "getThemeSuitePalettes");

// node_modules/@tamagui/theme-builder/dist/esm/createThemes.mjs
function createThemes(props) {
  const {
    accent,
    childrenThemes,
    grandChildrenThemes,
    templates = defaultTemplates,
    componentThemes
  } = props, builder = createSimpleThemeBuilder({
    extra: props.base.extra,
    componentThemes,
    palettes: createPalettes(getThemesPalettes(props)),
    templates,
    accentTheme: !!accent,
    childrenThemes: normalizeSubThemes(childrenThemes),
    grandChildrenThemes: grandChildrenThemes ? normalizeSubThemes(grandChildrenThemes) : void 0
  });
  return lastBuilder = builder.themeBuilder, builder.themes;
}
__name(createThemes, "createThemes");
var lastBuilder = null;
function normalizeSubThemes(defs) {
  return Object.fromEntries(Object.entries(defs || {}).map(([name, value]) => [name, {
    palette: name,
    template: value.template || "base"
  }]));
}
__name(normalizeSubThemes, "normalizeSubThemes");
var defaultPalettes = createPalettes(getThemesPalettes({
  base: {
    palette: ["#fff", "#000"]
  },
  accent: {
    palette: ["#ff0000", "#ff9999"]
  }
}));
function createSimpleThemeBuilder(props) {
  const {
    extra,
    childrenThemes = null,
    grandChildrenThemes = null,
    templates = defaultTemplates,
    palettes = defaultPalettes,
    accentTheme,
    componentThemes = templates === defaultTemplates ? defaultComponentThemes : void 0
  } = props;
  let themeBuilder = createThemeBuilder().addPalettes(palettes).addTemplates(templates).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...extra?.light,
        ...accentTheme && palettes.light_accent && {
          accent1: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 11]
        }
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...extra?.dark,
        ...accentTheme && palettes.dark_accent && {
          accent1: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 11]
        }
      }
    }
  });
  return palettes.light_accent && (themeBuilder = themeBuilder.addChildThemes({
    accent: [{
      parent: "light",
      template: "base",
      palette: "light_accent"
    }, {
      parent: "dark",
      template: "base",
      palette: "dark_accent"
    }]
  })), childrenThemes && (themeBuilder = themeBuilder.addChildThemes(childrenThemes, {
    avoidNestingWithin: ["accent"]
  })), grandChildrenThemes && (themeBuilder = themeBuilder.addChildThemes(grandChildrenThemes, {
    avoidNestingWithin: ["accent"]
  })), componentThemes && (themeBuilder = themeBuilder.addComponentThemes(getComponentThemes(componentThemes), {
    avoidNestingWithin: [
      // ...Object.keys(childrenThemes || {}),
      ...Object.keys(grandChildrenThemes || {})
    ]
  })), {
    themeBuilder,
    themes: themeBuilder.build()
  };
}
__name(createSimpleThemeBuilder, "createSimpleThemeBuilder");
function getSchemePalette(colors) {
  return {
    light: colors,
    dark: [...colors].reverse()
  };
}
__name(getSchemePalette, "getSchemePalette");
function getAnchors(palette) {
  const numItems = palette.light.length;
  return palette.light.map((lcolor, index) => {
    const dcolor = palette.dark[index], [lhue, lsat, llum] = parseToHsla(lcolor), [dhue, dsat, dlum] = parseToHsla(dcolor);
    return {
      index: spreadIndex(11, numItems, index),
      hue: {
        light: lhue,
        dark: dhue
      },
      sat: {
        light: lsat,
        dark: dsat
      },
      lum: {
        light: llum,
        dark: dlum
      }
    };
  });
}
__name(getAnchors, "getAnchors");
function spreadIndex(maxIndex, numItems, index) {
  return Math.round(index / (numItems - 1) * maxIndex);
}
__name(spreadIndex, "spreadIndex");
function coerceSimplePaletteToSchemePalette(def) {
  return Array.isArray(def) ? getSchemePalette(def) : def;
}
__name(coerceSimplePaletteToSchemePalette, "coerceSimplePaletteToSchemePalette");
function getThemesPalettes(props) {
  const base = coerceSimplePaletteToSchemePalette(props.base.palette), accent = props.accent ? coerceSimplePaletteToSchemePalette(props.accent.palette) : null, baseAnchors = getAnchors(base);
  function getSubThemesPalettes(defs) {
    return Object.fromEntries(Object.entries(defs).map(([key, value]) => [key, {
      name: key,
      anchors: value.palette ? getAnchors(coerceSimplePaletteToSchemePalette(value.palette)) : baseAnchors
    }]));
  }
  __name(getSubThemesPalettes, "getSubThemesPalettes");
  return {
    base: {
      name: "base",
      anchors: baseAnchors
    },
    ...accent && {
      accent: {
        name: "accent",
        anchors: getAnchors(accent)
      }
    },
    ...props.childrenThemes && getSubThemesPalettes(props.childrenThemes),
    ...props.grandChildrenThemes && getSubThemesPalettes(props.grandChildrenThemes)
  };
}
__name(getThemesPalettes, "getThemesPalettes");
var getComponentThemes = /* @__PURE__ */ __name((components) => Object.fromEntries(Object.entries(components).map(([componentName, {
  template
}]) => [componentName, {
  parent: "",
  template: template || "base"
}])), "getComponentThemes");
function createPalettes(palettes) {
  const accentPalettes = palettes.accent ? getThemeSuitePalettes(palettes.accent) : null, basePalettes = getThemeSuitePalettes(palettes.base);
  return Object.fromEntries(Object.entries(palettes).flatMap(([name, palette]) => {
    const palettes2 = getThemeSuitePalettes(palette), oppositePalettes = name.startsWith("accent") ? basePalettes : accentPalettes || basePalettes;
    if (!oppositePalettes) return [];
    const oppositeLight = oppositePalettes.light, oppositeDark = oppositePalettes.dark, bgOffset = 7;
    return [[name === "base" ? "light" : `light_${name}`, [oppositeLight[bgOffset], ...palettes2.light, oppositeLight[oppositeLight.length - bgOffset - 1]]], [name === "base" ? "dark" : `dark_${name}`, [oppositeDark[oppositeDark.length - bgOffset - 1], ...palettes2.dark, oppositeDark[bgOffset]]]];
  }));
}
__name(createPalettes, "createPalettes");

// node_modules/@tamagui/theme-builder/dist/esm/defaultTemplatesStronger.mjs
var getTemplates2 = /* @__PURE__ */ __name(() => {
  const lightTemplates = getBaseTemplates2("light"), darkTemplates = getBaseTemplates2("dark");
  return {
    ...objectFromEntries2(objectKeys(lightTemplates).map((name) => [`light_${name}`, lightTemplates[name]])),
    ...objectFromEntries2(objectKeys(darkTemplates).map((name) => [`dark_${name}`, darkTemplates[name]]))
  };
}, "getTemplates");
var getBaseTemplates2 = /* @__PURE__ */ __name((scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 2,
    backgroundHover: base.backgroundHover + 2,
    backgroundPress: base.backgroundPress + 2,
    backgroundFocus: base.backgroundFocus + 2,
    borderColor: base.borderColor + 2,
    borderColorHover: base.borderColorHover + 2,
    borderColorFocus: base.borderColorFocus + 2,
    borderColorPress: base.borderColorPress + 2
  }, surface2 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, surface3 = {
    ...baseColors,
    background: base.background + 4,
    backgroundHover: base.backgroundHover + 4,
    backgroundPress: base.backgroundPress + 4,
    backgroundFocus: base.backgroundFocus + 4,
    borderColor: base.borderColor + 4,
    borderColorHover: base.borderColorHover + 4,
    borderColorFocus: base.borderColorFocus + 4,
    borderColorPress: base.borderColorPress + 4
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [key, -index]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
}, "getBaseTemplates");
var defaultTemplatesStronger = getTemplates2();

// node_modules/@tamagui/theme-builder/dist/esm/defaultTemplatesStrongest.mjs
var getTemplates3 = /* @__PURE__ */ __name(() => {
  const lightTemplates = getBaseTemplates3("light"), darkTemplates = getBaseTemplates3("dark");
  return {
    ...objectFromEntries2(objectKeys(lightTemplates).map((name) => [`light_${name}`, lightTemplates[name]])),
    ...objectFromEntries2(objectKeys(darkTemplates).map((name) => [`dark_${name}`, darkTemplates[name]]))
  };
}, "getTemplates");
var getBaseTemplates3 = /* @__PURE__ */ __name((scheme) => {
  const isLight = scheme === "light", bgIndex = 6, lighten = isLight ? -1 : 1, darken = -lighten, borderColor = bgIndex + 3, baseColors = {
    color: -bgIndex,
    colorHover: -bgIndex - 1,
    colorPress: -bgIndex,
    colorFocus: -bgIndex - 1,
    placeholderColor: -bgIndex - 3,
    outlineColor: -2
  }, base = {
    accentBackground: 0,
    accentColor: -0,
    background0: 1,
    background02: 2,
    background04: 3,
    background06: 4,
    background08: 5,
    color1: bgIndex,
    color2: bgIndex + 1,
    color3: bgIndex + 2,
    color4: bgIndex + 3,
    color5: bgIndex + 4,
    color6: bgIndex + 5,
    color7: bgIndex + 6,
    color8: bgIndex + 7,
    color9: bgIndex + 8,
    color10: bgIndex + 9,
    color11: bgIndex + 10,
    color12: bgIndex + 11,
    color0: -1,
    color02: -2,
    color04: -3,
    color06: -4,
    color08: -5,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: bgIndex,
    backgroundHover: bgIndex + lighten,
    // always lighten on hover no matter the scheme
    backgroundPress: bgIndex + darken,
    // always darken on press no matter the theme
    backgroundFocus: bgIndex + darken,
    borderColor,
    borderColorHover: borderColor + lighten,
    borderColorPress: borderColor + darken,
    borderColorFocus: borderColor,
    ...baseColors,
    colorTransparent: -1
  }, surface1 = {
    ...baseColors,
    background: base.background + 3,
    backgroundHover: base.backgroundHover + 3,
    backgroundPress: base.backgroundPress + 3,
    backgroundFocus: base.backgroundFocus + 3,
    borderColor: base.borderColor + 3,
    borderColorHover: base.borderColorHover + 3,
    borderColorFocus: base.borderColorFocus + 3,
    borderColorPress: base.borderColorPress + 3
  }, surface2 = {
    ...baseColors,
    background: base.background + 4,
    backgroundHover: base.backgroundHover + 4,
    backgroundPress: base.backgroundPress + 4,
    backgroundFocus: base.backgroundFocus + 4,
    borderColor: base.borderColor + 4,
    borderColorHover: base.borderColorHover + 4,
    borderColorFocus: base.borderColorFocus + 4,
    borderColorPress: base.borderColorPress + 4
  }, surface3 = {
    ...baseColors,
    background: base.background + 5,
    backgroundHover: base.backgroundHover + 5,
    backgroundPress: base.backgroundPress + 5,
    backgroundFocus: base.backgroundFocus + 5,
    borderColor: base.borderColor + 5,
    borderColorHover: base.borderColorHover + 5,
    borderColorFocus: base.borderColorFocus + 5,
    borderColorPress: base.borderColorPress + 5
  }, alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1
  }, alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2
  }, inverse = Object.fromEntries(Object.entries(base).map(([key, index]) => [key, -index]));
  return {
    base,
    surface1,
    surface2,
    surface3,
    alt1,
    alt2,
    inverse
  };
}, "getBaseTemplates");
var defaultTemplatesStrongest = getTemplates3();

// node_modules/@tamagui/theme-builder/dist/esm/masks.mjs
var masks = {
  identity: createIdentityMask(),
  soften: createSoftenMask(),
  soften2: createSoftenMask({
    strength: 2
  }),
  soften3: createSoftenMask({
    strength: 3
  }),
  strengthen: createStrengthenMask(),
  inverse: createInverseMask(),
  inverseSoften: combineMasks(createInverseMask(), createSoftenMask({
    strength: 2
  })),
  inverseSoften2: combineMasks(createInverseMask(), createSoftenMask({
    strength: 3
  })),
  inverseSoften3: combineMasks(createInverseMask(), createSoftenMask({
    strength: 4
  })),
  inverseStrengthen2: combineMasks(createInverseMask(), createStrengthenMask({
    strength: 2
  })),
  strengthenButSoftenBorder: createMask((template, options) => {
    const stronger = createStrengthenMask().mask(template, options), softer = createSoftenMask().mask(template, options);
    return {
      ...stronger,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  soften2Border1: createMask((template, options) => {
    const softer2 = createSoftenMask({
      strength: 2
    }).mask(template, options), softer1 = createSoftenMask({
      strength: 1
    }).mask(template, options);
    return {
      ...softer2,
      borderColor: softer1.borderColor,
      borderColorHover: softer1.borderColorHover,
      borderColorPress: softer1.borderColorPress,
      borderColorFocus: softer1.borderColorFocus
    };
  }),
  soften3FlatBorder: createMask((template, options) => {
    const borderMask = createSoftenMask({
      strength: 2
    }).mask(template, options);
    return {
      ...createSoftenMask({
        strength: 3
      }).mask(template, options),
      borderColor: borderMask.borderColor,
      borderColorHover: borderMask.borderColorHover,
      borderColorPress: borderMask.borderColorPress,
      borderColorFocus: borderMask.borderColorFocus
    };
  }),
  softenBorder: createMask((template, options) => {
    const plain = skipMask.mask(template, options), softer = createSoftenMask().mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  softenBorder2: createMask((template, options) => {
    const plain = skipMask.mask(template, options), softer = createSoftenMask({
      strength: 2
    }).mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  })
};

// node_modules/@tamagui/colors/dist/esm/dark/green.mjs
var green = {
  green1: "hsl(146, 30.0%, 7.4%)",
  green2: "hsl(155, 44.2%, 8.4%)",
  green3: "hsl(155, 46.7%, 10.9%)",
  green4: "hsl(154, 48.4%, 12.9%)",
  green5: "hsl(154, 49.7%, 14.9%)",
  green6: "hsl(154, 50.9%, 17.6%)",
  green7: "hsl(153, 51.8%, 21.8%)",
  green8: "hsl(151, 51.7%, 28.4%)",
  green9: "hsl(151, 55.0%, 41.5%)",
  green10: "hsl(151, 49.3%, 46.5%)",
  green11: "hsl(151, 50.0%, 53.2%)",
  green12: "hsl(137, 72.0%, 94.0%)"
};

// node_modules/@tamagui/colors/dist/esm/dark/red.mjs
var red = {
  red1: "hsl(353, 23.0%, 9.8%)",
  red2: "hsl(357, 34.4%, 12.0%)",
  red3: "hsl(356, 43.4%, 16.4%)",
  red4: "hsl(356, 47.6%, 19.2%)",
  red5: "hsl(356, 51.1%, 21.9%)",
  red6: "hsl(356, 55.2%, 25.9%)",
  red7: "hsl(357, 60.2%, 31.8%)",
  red8: "hsl(358, 65.0%, 40.4%)",
  red9: "hsl(358, 75.0%, 59.0%)",
  red10: "hsl(358, 85.3%, 64.0%)",
  red11: "hsl(358, 100%, 69.5%)",
  red12: "hsl(351, 89.0%, 96.0%)"
};

// node_modules/@tamagui/colors/dist/esm/dark/yellow.mjs
var yellow = {
  yellow1: "hsl(45, 100%, 5.5%)",
  yellow2: "hsl(46, 100%, 6.7%)",
  yellow3: "hsl(45, 100%, 8.7%)",
  yellow4: "hsl(45, 100%, 10.4%)",
  yellow5: "hsl(47, 100%, 12.1%)",
  yellow6: "hsl(49, 100%, 14.3%)",
  yellow7: "hsl(49, 90.3%, 18.4%)",
  yellow8: "hsl(50, 100%, 22.0%)",
  yellow9: "hsl(53, 92.0%, 50.0%)",
  yellow10: "hsl(54, 100%, 68.0%)",
  yellow11: "hsl(48, 100%, 47.0%)",
  yellow12: "hsl(53, 100%, 91.0%)"
};

// node_modules/@tamagui/colors/dist/esm/light/green.mjs
var green2 = {
  green1: "hsl(136, 50.0%, 98.9%)",
  green2: "hsl(138, 62.5%, 96.9%)",
  green3: "hsl(139, 55.2%, 94.5%)",
  green4: "hsl(140, 48.7%, 91.0%)",
  green5: "hsl(141, 43.7%, 86.0%)",
  green6: "hsl(143, 40.3%, 79.0%)",
  green7: "hsl(146, 38.5%, 69.0%)",
  green8: "hsl(151, 40.2%, 54.1%)",
  green9: "hsl(151, 55.0%, 41.5%)",
  green10: "hsl(152, 57.5%, 37.6%)",
  green11: "hsl(153, 67.0%, 28.5%)",
  green12: "hsl(155, 40.0%, 14.0%)"
};

// node_modules/@tamagui/colors/dist/esm/light/red.mjs
var red2 = {
  red1: "hsl(359, 100%, 99.4%)",
  red2: "hsl(359, 100%, 98.6%)",
  red3: "hsl(360, 100%, 96.8%)",
  red4: "hsl(360, 97.9%, 94.8%)",
  red5: "hsl(360, 90.2%, 91.9%)",
  red6: "hsl(360, 81.7%, 87.8%)",
  red7: "hsl(359, 74.2%, 81.7%)",
  red8: "hsl(359, 69.5%, 74.3%)",
  red9: "hsl(358, 75.0%, 59.0%)",
  red10: "hsl(358, 69.4%, 55.2%)",
  red11: "hsl(358, 65.0%, 48.7%)",
  red12: "hsl(354, 50.0%, 14.6%)"
};

// node_modules/@tamagui/colors/dist/esm/light/yellow.mjs
var yellow2 = {
  yellow1: "hsl(60, 54.0%, 98.5%)",
  yellow2: "hsl(52, 100%, 95.5%)",
  yellow3: "hsl(55, 100%, 90.9%)",
  yellow4: "hsl(54, 100%, 86.6%)",
  yellow5: "hsl(52, 97.9%, 82.0%)",
  yellow6: "hsl(50, 89.4%, 76.1%)",
  yellow7: "hsl(47, 80.4%, 68.0%)",
  yellow8: "hsl(48, 100%, 46.1%)",
  yellow9: "hsl(53, 92.0%, 50.0%)",
  yellow10: "hsl(50, 100%, 48.5%)",
  yellow11: "hsl(42, 100%, 29.0%)",
  yellow12: "hsl(40, 55.0%, 13.5%)"
};

// theme.ts
var darkPalette = ["#030202", "#120d0d", "#231a1a", "#322625", "#433432", "#523f3d", "#654d49", "#735954", "#856860", "#94746b", "#f0eaea", "#fdfcfc"];
var lightPalette = ["#fdfcfc", "#f2eded", "#e5dcdc", "#dacecd", "#cdbdbc", "#c2afad", "#b69f9a", "#ab918c", "#9f817a", "#94746b", "#2c2121", "#030202"];
var lightShadows = {
  shadow1: "rgba(0,0,0,0.04)",
  shadow2: "rgba(0,0,0,0.08)",
  shadow3: "rgba(0,0,0,0.16)",
  shadow4: "rgba(0,0,0,0.24)",
  shadow5: "rgba(0,0,0,0.32)",
  shadow6: "rgba(0,0,0,0.4)"
};
var darkShadows = {
  shadow1: "rgba(0,0,0,0.2)",
  shadow2: "rgba(0,0,0,0.3)",
  shadow3: "rgba(0,0,0,0.4)",
  shadow4: "rgba(0,0,0,0.5)",
  shadow5: "rgba(0,0,0,0.6)",
  shadow6: "rgba(0,0,0,0.7)"
};
var builtThemes = createThemes({
  componentThemes: defaultComponentThemes,
  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette
    },
    extra: {
      light: {
        ...green2,
        ...red2,
        ...yellow2,
        ...lightShadows,
        shadowColor: lightShadows.shadow1
      },
      dark: {
        ...green,
        ...red,
        ...yellow,
        ...darkShadows,
        shadowColor: darkShadows.shadow1
      }
    }
  },
  accent: {
    palette: {
      dark: ["#559e33", "#59a636", "#5dad38", "#61b53b", "#66bd3d", "#6ec346", "#74c64e", "#7ac856", "#80cb5d", "#86cd65", "#ddd9f2", "#eeecf9"],
      light: ["#519631", "#57a234", "#5dad38", "#64b93c", "#6bc242", "#71c44a", "#7ac856", "#83cc61", "#8cd06d", "#95d378", "#eeecf9", "#eeecf9"]
    }
  },
  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(yellow),
        light: Object.values(yellow2)
      }
    },
    error: {
      palette: {
        dark: Object.values(red),
        light: Object.values(red2)
      }
    },
    success: {
      palette: {
        dark: Object.values(green),
        light: Object.values(green2)
      }
    }
  }
  // optionally add more, can pass palette or template
  // grandChildrenThemes: {
  //   alt1: {
  //     template: 'alt1',
  //   },
  //   alt2: {
  //     template: 'alt2',
  //   },
  //   surface1: {
  //     template: 'surface1',
  //   },
  //   surface2: {
  //     template: 'surface2',
  //   },
  //   surface3: {
  //     template: 'surface3',
  //   },
  // },
});
var themes = process.env.TAMAGUI_ENVIRONMENT === "client" && process.env.NODE_ENV === "production" ? {} : builtThemes;

// tamagui.config.ts
var import_core = require("@tamagui/core");
var config = (0, import_core.createTamagui)({
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
      xl2: 40
    },
    // margin="$-sm"
    space: { "-sm": 8 },
    // radius="$none"
    radius: { none: 0, sm: 3 },
    color: { white: "#fff", black: "#000" }
  },
  themes,
  // media query definitions can be used to style,
  // but also can be used with "groups" to do container queries by size:
  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" }
  },
  shorthands: {
    // <View px={20} />
    px: "paddingHorizontal"
  },
  settings: {
    disableSSR: true,
    // for client-side apps gains a bit of performance
    allowedStyleValues: "somewhat-strict-web"
    // if targeting only web
  }
});
var tamagui_config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
