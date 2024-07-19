import React from "react";
import { TableCell, TableRow, TableSortLabel, TableHead } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DesignerTableHeadProps {
	order: "asc" | "desc";
	orderBy: "username" | "email";
	onRequestSort: (property: "username" | "email") => void;
}

const DesignerTableHead: React.FC<DesignerTableHeadProps> = ({ order, orderBy, onRequestSort }) => {
	const { t } = useTranslation();

	const headCells = [
		{ id: "avatar", label: t("designers.avatar"), sortable: false, width: "10%" },
		{ id: "username", label: t("designers.name"), sortable: true, width: "20%" },
		{ id: "email", label: "Email", sortable: true, width: "30%" },
		{ id: "tasksClosed", label: t("designers.tasksClosed"), sortable: false, width: "15%" },
		{ id: "tasksInProgress", label: t("designers.tasksInProgress"), sortable: false, width: "15%" },
	];
	const createSortHandler = (property: "username" | "email") => () => {
		onRequestSort(property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
						style={{ width: headCell.width, minWidth: headCell.width }}
					>
						{headCell.sortable ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : "asc"}
								onClick={createSortHandler(headCell.id as "username" | "email")}
							>
								{headCell.label}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default DesignerTableHead;
