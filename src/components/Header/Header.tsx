import React from "react";
import { AppBar, Toolbar, Typography, Switch, Select, MenuItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "../../themeContext/themeContext";
import { styled } from "@mui/material/styles";


const StyledLink = styled(Link)(({theme}) => ({
	textDecoration: "none",
	color: "inherit"
}))


const Header = () => {
	const { t, i18n } = useTranslation();
	const {darkMode, toggleDarkMode} = useTheme()


	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					style={{ flexGrow: 1 }}
					component={StyledLink}
					to={"/"}
				>
					CRM System
				</Typography>
				<Button
					color="inherit"
					style={{ marginRight: "16px" }}
					component={Link}
					to="/tasks"
				>
					{t("tasks")}
				</Button>
				<Button
					color="inherit"
					style={{ marginRight: "16px" }}
					component={Link}
					to="/designers"
				>
					{t("designers")}
				</Button>
				<Switch
					color="default"
					checked={darkMode}
					onChange={toggleDarkMode}
				/>
				<Select
					defaultValue="EN"
					style={{ marginLeft: "16px" }}
				>
					<MenuItem
						onClick={() => i18n.changeLanguage("en")}
						value="EN"
					>
						EN
					</MenuItem>
					<MenuItem
						onClick={() => i18n.changeLanguage("ru")}
						value="RU"
					>
						RU
					</MenuItem>
				</Select>
				<Typography
					variant="body1"
					style={{ marginLeft: "16px" }}
				>
					{t("Week")} 28
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
