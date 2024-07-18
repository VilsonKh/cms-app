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

  console.log(status)

	return (
		<List>
			{status === "loading" ? (
				<CommentsListItemSkeleton count={5} />
			) : (
				comments.map((comment) => {
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
