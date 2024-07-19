import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getTasks } from "../../store/slices/tasksSlice";
import { Grid, Box } from "@mui/material";
import { getStatusData, processData } from "../../utils/chartHelpers";
import LineChartComponent from "./LineChartComponent/LineChartComponent";
import PieChartComponent from "./PieChartComponent/PieChartComponent";
import LineChartSkeleton from "./LineChartComponent/LineChartSkeleton";
import PieChartSkeleton from "./PieChartComponent/PieChartSkeleton";
import ErrorNetworkMessage from "../ErrorNetworkMessage/ErrorNetworkMessage";

const TaskChart: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const allTasks = useSelector((state: RootState) => state.tasks.tasks);
	const status = useSelector((state: RootState) => state.tasks.status);
	const [numOfWeeks, setNumOfWeeks] = useState(8);

	useEffect(() => {
		if (status === "idle" && (!allTasks || allTasks.length === 0)) {
			console.log("get tasks");
			dispatch(getTasks());
		}
	}, [dispatch, status, allTasks]);

	if (status === "failed") {
		return <ErrorNetworkMessage message={"Failed to load data"} />;
	}

	const closedTasks = useMemo(() => {
	
		return allTasks.filter((task: any) => task.status === "Done");
	}, [allTasks]);

	const data = useMemo(() => {
		return processData(closedTasks, numOfWeeks);
	}, [closedTasks, numOfWeeks]);

	const statusData = useMemo(() => {
		return getStatusData(allTasks);
	}, [allTasks]);

	return (
		<Box p={2}>
			<Grid
				container
				spacing={4}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Grid>
					{status === "loading" ? (
						<LineChartSkeleton />
					) : (
						<LineChartComponent
							data={data}
							numOfWeeks={numOfWeeks}
							setNumOfWeeks={setNumOfWeeks}
						/>
					)}
				</Grid>

				<Grid>{status === "loading" ? <PieChartSkeleton /> : <PieChartComponent data={statusData} />}</Grid>
			</Grid>
		</Box>
	);
};

export default TaskChart;
