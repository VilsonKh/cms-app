import { ListItem, Skeleton } from "@mui/material";

interface SkelotonProps {
	count: number;
}

const TopDesignersListItemSkeleton: React.FC<SkelotonProps> = ({ count }) => {
	return (
		<>
			{[...new Array(count)].map((_, index) => (
				<ListItem key={index}>
					<Skeleton
						variant="text"
						width={24}
						height={24}
						style={{ marginRight: 16 }}
					/>
					<Skeleton
						variant="circular"
						width={40}
						height={40}
					/>
					<div style={{ marginLeft: 16, width: "100%" }}>
						<Skeleton
							variant="text"
							width="30%"
							height={24}
						/>
						<Skeleton
							variant="text"
							width="50%"
							height={20}
						/>
					</div>
				</ListItem>
			))}
		</>
	);
};

export default TopDesignersListItemSkeleton;
