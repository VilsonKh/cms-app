import React, { useState } from "react";
import { ListItem, Avatar, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Comment {
  id: string;
  designer: {
    avatar: string;
    username: string;
  };
  date_created: string;
  issue: string;
  message: string;
}

interface CommentListItemProps {
  comment: Comment;
}

const CommentsListItem: React.FC<CommentListItemProps> = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useTranslation()

  const timeSinceComment = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diff = now.getTime() - commentDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} ${t("days ago")}`;
    } else if (hours > 0) {
      return `${hours} ${t('hours ago')}`;
    } else if (minutes > 0) {
      return `${minutes} ${t('minutes ago')}`;
    } else {
      return `${seconds} ${t('seconds ago')}`;
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const MAX_LENGTH = 100;
  const isExpanded = expanded;
  const messageToShow = isExpanded
    ? comment.message
    : comment.message.length > MAX_LENGTH
    ? `${comment.message.substring(0, MAX_LENGTH)}...`
    : comment.message;

  return (
    <ListItem key={comment.id} alignItems="flex-start">
      <Avatar src={comment.designer.avatar} />
      <div style={{ marginLeft: 16 }}>
        <Typography variant="body1">
          {`${t("Username")}: ${comment.designer.username}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {timeSinceComment(comment.date_created)}
        </Typography>
        <Typography variant="body2">{`${t("Issue")}: ${comment.issue}`}</Typography>
        <Typography variant="body2">{`${t("Message")}: ${messageToShow}`}</Typography>
        {comment.message.length > MAX_LENGTH && (
          <Button variant="text" color="primary" onClick={toggleExpanded}>
            {isExpanded ? t("read less") : t("read more")}
          </Button>
        )}
      </div>
    </ListItem>
  );
};

export default CommentsListItem;
