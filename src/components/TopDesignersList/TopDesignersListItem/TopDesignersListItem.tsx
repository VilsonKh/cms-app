import React from "react";
import { ListItem, Avatar, Typography } from "@mui/material";
import { convertHours } from "../../../utils/dateHelpers";
import { useTranslation } from "react-i18next";

interface DesignerListItemProps {
  designer: {
    avatar: string;
    username: string;
    medianTime: number;
    completedTasksCount: number;
  };
  index: number;
}

const DesignerListItem: React.FC<DesignerListItemProps> = ({ designer, index }) => {
  const {t} = useTranslation();
  return (
    <ListItem key={designer.username}>
      <Typography variant="h6" style={{ marginRight: 16, minWidth: 20, textAlign: 'right' }}>{index + 1}</Typography>
      <Avatar src={designer.avatar} />
      <div style={{ marginLeft: 16 }}>
        <Typography variant="body1">{designer.username}</Typography>
        <Typography variant="body2" color="textSecondary">
          {t("Median time")}: {convertHours(designer.medianTime)} - {t("Completed tasks")}: {designer.completedTasksCount}
        </Typography>
      </div>
    </ListItem>
  );
};

export default DesignerListItem;
