import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { convertHours, formatDate, relativeTime } from "../../utils/dateHelpers";
import { getTasksAmount } from "../../utils/countHelpers";

const TopDesignersList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const designers = useSelector((state: RootState) => state.designers.list);

	useEffect(() => {
		dispatch(getDesigners());
	}, [dispatch]);

	if (!designers || !designers.results) return null;

	const analyzeTasks = (tasks: { status: string; date_created: string }[]) => {
		if (!tasks) return { medianTime: 0, completedTasksCount: 0 };

		const completedTasks = tasks.filter((task) => task.status === "Done");

		const now = new Date();

		const completionTimes = completedTasks.map((task) => {
			const createdDate = new Date(task.date_created);
			const timeDiff = now.getTime() - createdDate.getTime();
			const hoursDiff = timeDiff / (1000 * 60 * 60);
			return hoursDiff;
		});

		return {
			medianTime: calculateMedian(completionTimes),
			completedTasksCount: completedTasks.length,
		};
	};

	const calculateMedian = (times: number[]) => {
		if (!times.length) return 0;
		const sortedTimes = [...times].sort((a, b) => a - b);
		const length = sortedTimes.length;
		const middle = Math.floor(length / 2);

		if (length % 2 === 0) {
			return (sortedTimes[middle - 1] + sortedTimes[middle]) / 2;
		} else {
			return sortedTimes[middle];
		}
	};

	const sortedDesigners = (designers.results || [])
		.map((designer) => {
			const { medianTime, completedTasksCount } = analyzeTasks(designer.issues);
			return { ...designer, medianTime, completedTasksCount };
		})
		.sort((a, b) => {
			if (a.medianTime !== b.medianTime) {
				return a.medianTime - b.medianTime;
			}
			return b.completedTasksCount - a.completedTasksCount;
		});

	return (
		<List>
			{sortedDesigners.map((designer) => (
				<ListItem key={designer.id}>
					<Avatar src={designer.avatar} />
					<div>
						<Typography variant="body1">{designer.username}</Typography>
						<Typography variant="body2" color="textSecondary">
							Median Time: {convertHours(designer.medianTime)} - Tasks Completed: {designer.completedTasksCount}
						</Typography>
					</div>
				</ListItem>
			))}
		</List>
	);
};

export default TopDesignersList;
