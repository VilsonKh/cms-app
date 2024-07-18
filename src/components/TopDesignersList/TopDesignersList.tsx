import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { convertHours } from "../../utils/dateHelpers";
import TopDesignersListItemSkeleton from "./TopDesignersListItemSkeleton";

const TopDesignersList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const designers = useSelector((state: RootState) => state.designers.list);
  const status = useSelector((state: RootState) => state.designers.status);

  useEffect(() => {
    if (status === 'idle' && (!designers.results || designers.results.length === 0)) {
      // @ts-ignore
      dispatch(getDesigners({ page: 1, limit: 10 }));
    }
  }, [dispatch, status, designers.results]);

  if (status === "loading") {
    return <TopDesignersListItemSkeleton count={5} />;
  }

  if (!designers.results) return null;

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

  const sortedDesigners = designers.results
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
      {sortedDesigners.map((designer, index) => (
        <ListItem key={designer.id}>
          <Avatar src={designer.avatar} />
          <div style={{ marginLeft: 16 }}>
            <Typography variant="body1">
              {index + 1}. {designer.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t("designers.medianTime")}: {convertHours(designer.medianTime, t)} - {t("designers.completedTasks")}: {designer.completedTasksCount}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default TopDesignersList;
