import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { List } from "@mui/material";
import TopDesignersListItemSkeleton from "./TopDesignersListItemSkeleton";
import TopDesignersListItem from "./TopDesignersListItem/TopDesignersListItem";
const TopDesignersList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const designers = useSelector((state: RootState) => state.designers.list);
	const status = useSelector((state: RootState) => state.designers.status);

	useEffect(() => {
		dispatch(getDesigners({ limit: 10 }));
	}, [dispatch]);
	

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
			{status === "loading" ? (
				<TopDesignersListItemSkeleton count={5} />
			) : (
				sortedDesigners.map((designer, index) => (
					<TopDesignersListItem
						key={designer.id}
						designer={designer}
						index={index}
					/>
				))
			)}
		</List>
	);
};

export default TopDesignersList;
