import React from "react";
import { AppBar, Toolbar, Typography, Switch, Select, MenuItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header: React.FC<{ setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; darkMode: boolean }> = ({ setDarkMode, darkMode }) => {
	const { t, i18n } = useTranslation();
	const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDarkMode(event.target.checked);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					style={{ flexGrow: 1 }}
          component={Link}
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
          Tasks
				</Button>
        <Button
					color="inherit"
					style={{ marginRight: "16px" }}
          component={Link}
          to="/designers"
				>
          Designers 
				</Button>
				<Switch
					color="default"
					checked={darkMode}
					onChange={handleThemeChange}
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
