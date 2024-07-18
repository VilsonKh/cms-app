import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Typography, TextField, MenuItem, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const LineChartComponent: React.FC<{ data: any[]; numOfWeeks: number; setNumOfWeeks: (weeks: number) => void }> = ({
	data,
	numOfWeeks,
	setNumOfWeeks,
}) => {
	const { t } = useTranslation();

	const legendFormatter = (value: "profit" | "expenses" | "net") => {
		switch (value) {
			case "profit":
				return t("tasks.profit");
			case "expenses":
				return t("tasks.expenses");
			case "net":
				return t("tasks.net");
			default:
				return value;
		}
	};

	return (
		<Box p={2}>
			<TextField
				select
				label={t("tasks.numberOfWeeks")}
				value={numOfWeeks}
				onChange={(e) => setNumOfWeeks(Number(e.target.value))}
				variant="outlined"
				style={{ marginBottom: "16px", width: "150px" }}
			>
				{[4, 8, 12, 16].map((option) => (
					<MenuItem
						key={option}
						value={option}
					>
						{option}
					</MenuItem>
				))}
			</TextField>
			<Typography
				variant="h6"
				gutterBottom
			>
				{t("tasks.tasksOverWeeks")}
			</Typography>
			<LineChart
				width={500}
				height={300}
				data={data}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="week" />
				<YAxis />
				<Tooltip />
				<Legend formatter={legendFormatter} />

				<Line
					type="monotone"
					dataKey="profit"
					stroke="#8884d8"
				/>
				<Line
					type="monotone"
					dataKey="expenses"
					stroke="#82ca9d"
				/>
				<Line
					type="monotone"
					dataKey="net"
					stroke="#ff7300"
				/>
			</LineChart>
		</Box>
	);
};

export default LineChartComponent;
