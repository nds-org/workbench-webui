import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

// @ts-ignore
const DarkThemeProvider = ({ children }) => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    return (
        <ThemeProvider theme={{ theme: darkThemeEnabled ? "dark" : "light" }}>
            {children}
        </ThemeProvider>
    );
};

export default DarkThemeProvider;
