import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableSkeleton = ({rows}: {rows: number}) => {
	return (
		<>
			{[... new Array(rows)].map((_, index) => (
				<TableRow key={index}>
					<TableCell>
						<Skeleton
							variant="circular"
							width={40}
							height={40}
						/>
					</TableCell>
					<TableCell>
						<Skeleton width="80%" />
					</TableCell>
					<TableCell>
						<Skeleton width="80%" />
					</TableCell>
					<TableCell>
						<Skeleton width="50%" />
					</TableCell>
					<TableCell>
						<Skeleton width="50%" />
					</TableCell>
				</TableRow>
			))}
		</>
	);
};

export default TableSkeleton;
