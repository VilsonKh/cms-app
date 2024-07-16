import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getComments } from "../../store/slices/commentsSlice";
import { List, ListItem, Avatar, Typography } from "@mui/material";

const CommentsList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const comments = useSelector((state: RootState) => state.comments.latest);

	useEffect(() => {
		dispatch(getComments());
	}, [dispatch]);

  const timeSinceComment = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diff = now.getTime() - commentDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

	return (
		<List>
			{comments.map((comment) => {
				return (
					<ListItem key={comment.id}>
						<Avatar src={comment.designer.avatar} />
						<div>
							<Typography variant="body1">{"Username: " +comment.designer.username}</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
							>
								{timeSinceComment(comment.date_created)}
							</Typography>
							<Typography variant="body2">{"Issue: "+comment.issue}</Typography>
							<Typography variant="body2">{"Message: "+comment.message}</Typography>
						</div>
					</ListItem>
				);
			})}
		</List>
	);
};

export default CommentsList;