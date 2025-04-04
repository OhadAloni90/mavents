import { Box, styled } from "@mui/material";

export const StyledToastBox =  styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1300, // makes sure it appears above other content
    bottom:22,
}))