import { TypographyVariantsOptions } from '@mui/material/styles/createTypography';
const typography: TypographyVariantsOptions = {
  fontFamily: "'Montserrat', sans-serif",
  // Main title variant  - For titles e.g. 'Mavens  games' at the top header
  h1: {
    fontSize: 36,
    fontWeight: 600, // semi-bold
  },
  // Subtitle variant (MUI provides subtitle1 or subtitle2; we use subtitle1 here)
  subtitle1: {
    fontSize: 16,
    fontWeight: 600, // semi-bold
  },
  // Regular text variant (body1 is often used for normal text)
  body1: {
    fontSize: 22,
    fontWeight: 400, // normal
  }, 
  body2:{
    fontSize: 16,
    fontWeight: 400
  },
  mavensTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mavensSubTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5,
  },
  mavensBigTitleBold: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  mavenMediumText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: "'Montserrat', sans-serif",
  },
  mavenRegularText: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: "'Montserrat', sans-serif",
  },
  mavenLeaderboardText: {
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: "'Montserrat', sans-serif",
  },
  mavenLeaderboardTitleText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: "'Montserrat', sans-serif",
  },

};
export default typography;
