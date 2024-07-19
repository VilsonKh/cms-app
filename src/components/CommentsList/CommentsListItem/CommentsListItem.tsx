import React, { useState } from "react";
import { ListItem, Avatar, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatDistanceToNowStrict } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

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
  const { t, i18n } = useTranslation();

  const timeSinceComment = (date: string) => {

    const commentDate = new Date(date);

    const locale = i18n.language === 'ru' ? ru : enUS;

    const distance = formatDistanceToNowStrict(commentDate, { addSuffix: true, locale });
    
    return distance.replace(/(\d+)\s(\w+)/, (_, number, unit) => {
      return t(`time.${unit}`, { count: number });
    });
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
