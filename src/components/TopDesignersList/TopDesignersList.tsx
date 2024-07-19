import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getTopDesigners } from "../../store/slices/topDesignersSlice";
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { convertHours } from "../../utils/dateHelpers";
import TopDesignersListItemSkeleton from "./TopDesignersListItemSkeleton";
import ErrorNetworkMessage from "../ErrorNetworkMessage/ErrorNetworkMessage";

const TopDesignersList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const topDesigners = useSelector((state: RootState) => state.topDesigners.list);
  const status = useSelector((state: RootState) => state.topDesigners.status);

  useEffect(() => {
    if (status === 'idle' && (!topDesigners.results || topDesigners.results.length === 0)) {
      //@ts-ignore
      dispatch(getTopDesigners({ page: 1, limit: 10 }));
    }
  }, [dispatch, status, topDesigners.results]);

  if (status === "loading") {
    return <TopDesignersListItemSkeleton count={5} />;
  }

  if (!topDesigners.results) return null;

  if (status === "failed") {
    return <ErrorNetworkMessage message={"Failed to load designers"} />;
  }

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

  const sortedDesigners = topDesigners.results
    .map((designer: any) => {
      const { medianTime, completedTasksCount } = analyzeTasks(designer.issues);
      return { ...designer, medianTime, completedTasksCount };
    })
    .sort((a: any, b: any) => {
      if (a.medianTime !== b.medianTime) {
        return a.medianTime - b.medianTime;
      }
      return b.completedTasksCount - a.completedTasksCount;
    });

  return (
    <List>
      {sortedDesigners.map((designer: any, index: any) => (
        <ListItem key={designer.username} style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ minWidth: 30, textAlign: 'right', marginRight: 16 }}>
            {index + 1}.
          </Typography>
          <Avatar src={designer.avatar} />
          <div style={{ marginLeft: 16 }}>
            <Typography variant="body1">
              {designer.username}
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
