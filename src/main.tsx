import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routes from "./routes/routes";
import "./locales/i18n";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeContext, ThemeProvider } from "./themeContext/themeContext";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

const App: React.FC = () => {

	const { darkMode } = useContext(ThemeContext);

	return (
		<MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<Provider store={store}>
				<Routes />
			</Provider>
		</MuiThemeProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
