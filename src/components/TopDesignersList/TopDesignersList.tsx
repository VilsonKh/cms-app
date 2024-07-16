import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { convertHours, formatDate, relativeTime } from "../../utils/dateHelpers";

const TopDesignersList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const designers = useSelector((state: RootState) => state.designers.list);

	useEffect(() => {
		dispatch(getDesigners());
	}, [dispatch]);

  const analyzeTasks = (tasks: [{status: string, date_created: string}]) => {
    const completedTasks = tasks.filter((task) => task.status === 'Done');

    const now = new Date();

    const completionTimes = completedTasks.map((task) => {
      const createdDate = new Date(task.date_created);
      const timeDiff = now.getTime() - createdDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      return hoursDiff;
    });

    console.log(calculateMedian(completionTimes))

    return {
      medianTime: calculateMedian(completionTimes),
      completedTasksCount: completedTasks.length
    }
  }

  const calculateMedian = (times) => {
    const length = times.length;
    const middle = Math.floor(length / 2);

    if (length % 2 === 0) {
      return (times[middle - 1] + times[middle]) / 2;
    } else {
      return times[middle];
    }
  }

  const sortedDesigners = designers.map(designer => {
    const {medianTime, completedTasksCount} = analyzeTasks(designer.issues)
    return {...designer, medianTime, completedTasksCount}
  }).sort((a,b) => {
    if(a.medianTime !== b.medianTime) {
      return a.medianTime - b.medianTime
    }
    return b.medianTime - a.medianTime
  })

	return (
		<List>
			{sortedDesigners.map((designer) => {
        const { medianTime, completedTasksCount } = analyzeTasks(designer.issues)
				console.log(designer);
				return (
					<ListItem key={designer.id}>
						<Avatar src={designer.avatar} />
						<div>
							<Typography variant="body1">{designer.username}</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
							>
								Median Time: {convertHours(medianTime)} - Tasks Completed: {completedTasksCount}
							</Typography>
						</div>
					</ListItem>
				);
			})}
		</List>
	);
};

export default TopDesignersList;
