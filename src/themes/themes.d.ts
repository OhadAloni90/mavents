// theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brandGray: Palette['primary'];
    brandGray2: Palette['primary'];
    brandGray3: Palette['primary'];
    brandWhite: Palette['primary'];
    brandPinkSecondary: Palette['primary'];
    brandPink02: Palette['primary'];
    brandGreen: Palette['primary'];
    brandRed: Palette['primary'];
  }

  interface PaletteOptions {
    brandGray?: PaletteOptions['primary'];
    brandGray2?: PaletteOptions['primary'];
    brandGray3: PaletteOptions['primary'];
    brandWhite?: PaletteOptions['primary'];
    brandPinkSecondary?: PaletteOptions['primary'];
    brandPink02?: PaletteOptions['primary'];
    brandGreen?: PaletteOptions['primary'];
    brandRed?: PaletteOptions['primary'];
  }
  interface ShadowOptions {
    
  }
}
