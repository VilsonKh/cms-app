import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getComments } from "../../store/slices/commentsSlice";
import { List } from "@mui/material";
import CommentsListItem from "./CommentsListItem/CommentsListItem";
import CommentsListItemSkeleton from "./CommentsListItemSkeleton";
const CommentsList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const comments = useSelector((state: RootState) => state.comments.latest);
	const status = useSelector((state: RootState) => state.comments.status);

	useEffect(() => {
		dispatch(getComments());
	}, [dispatch]);

	const sortedComments = [...comments].sort((a, b) => {
    return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
  });

	return (
		<List>
			{status === "loading" ? (
				<CommentsListItemSkeleton count={5} />
			) : (
				sortedComments.map((comment) => {
					return (
						<CommentsListItem
							key={comment.id}
							comment={comment}
						/>
					);
				})
			)}
		</List>
	);
};

export default CommentsList;
