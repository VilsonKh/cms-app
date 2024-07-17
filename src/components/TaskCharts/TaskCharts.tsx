import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getTasks } from "../../store/slices/tasksSlice";
import { Grid, Typography, Box } from "@mui/material";
import { getStatusData, processData } from "../../utils/chartHelpers";
import LineChartComponent from "./LineChartComponent/LineChartComponent";
import PieChartComponent from "./PieChartComponent/PieChartComponent";

const TaskChart: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const allTasks = useSelector((state: RootState) => state.tasks.tasks);
	const [numOfWeeks, setNumOfWeeks] = useState(8);

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	const closedTasks = allTasks.filter((task) => task.status === "Done");
	const data = processData(closedTasks, numOfWeeks);
	const statusData = getStatusData(allTasks);

	return (
		<Grid
			container
			justifyContent={"space-between"}
		>
			<LineChartComponent
				data={data}
				numOfWeeks={numOfWeeks}
				setNumOfWeeks={setNumOfWeeks}
			/>
			<PieChartComponent data={statusData} />
		</Grid>
	);
};

export default TaskChart;
