import '@mui/material/styles';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    mavensTitle: React.CSSProperties;
    mavensSubTitle: React.CSSProperties;
    mavensBigTitleBold: React.CSSProperties;
    mavenMediumText: React.CSSProperties;
    mavenRegularText: React.CSSProperties;
    mavenLeaderboardText: React.CSSProperties;
    mavenLeaderboardTitleText: React.CSSProperties;

  }
  interface TypographyVariantsOptions {
    mavensTitle?: React.CSSProperties;
    mavensSubTitle?: React.CSSProperties;
    mavensBigTitleBold?: React.CSSProperties;
    mavenMediumText?: React.CSSProperties;
    mavenRegularText?: React.CSSProperties;
    mavenLeaderboardText?: React.CSSProperties;
    mavenLeaderboardTitleText?: React.CSSProperties;

  }

  interface Palette {
    baseGray: Palette['primary'];
    baseGray2: Palette['primary'];
    baseGray3: Palette['primary'];
    baseWhite: Palette['primary'];
    basePinkSecondary: Palette['primary'];
    basePink02: Palette['primary'];
    infoGreen: Palette['primary'];
    infoRed: Palette['primary'];
    leaderboardInnerTableColor: Palette['primary'];
  }
  interface PaletteOptions {
    baseGray?: PaletteOptions['primary'];
    baseGray2?: PaletteOptions['primary'];
    baseGray3: PaletteOptions['primary'];
    baseWhite?: PaletteOptions['primary'];
    basePinkSecondary?: PaletteOptions['primary'];
    basePink02?: PaletteOptions['primary'];
    infoGreen?: PaletteOptions['primary'];
    infoRed?: PaletteOptions['primary'];
    leaderboardInnerTableColor?: PaletteOptions['primary'];

  }
  interface Theme {
    customShadows: {
      alert: string[];
      header: string[];
      dialogs: string[];
      gameHeader: string[],
      gameCube: string[]
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      alert?: string[];
      header?: string[];
      dialogs?: string[];
      gameHeader?: string[];
      gameCube?: string[]
    },
  }
}
interface TypographyVariants {
  mavensTitle: React.CSSProperties;
  mavensSubTitle: React.CSSProperties;
  mavensBigTitleBold: React.CSSProperties;
  mavenMediumText: React.CSSProperties;
  mavenRegularText: React.CSSProperties;
  mavenLeaderboardText: React.CSSProperties;
  mavenLeaderboardTitleText: React.CSSProperties;
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mavensTitle: true;
    mavensSubTitle: true;
    mavensBigTitleBold: true;
    mavenMediumText: true;
    mavenRegularText: true;
    mavenLeaderboardText: true;
    mavenLeaderboardTitleText: true;
  }
}