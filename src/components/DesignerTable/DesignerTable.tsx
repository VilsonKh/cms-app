import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { Table, TableContainer, Paper, TablePagination } from "@mui/material";
import DesignerTableHead from "./DesignerTableHead/DesignerTableHead";
import DesignerTableBody from "./DesignerTableBody/DesignerTableBody";

const DesignerTable: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const designers = useSelector((state: RootState) => state.designers.list);
	const status = useSelector((state: RootState) => state.designers.status);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [order, setOrder] = useState<"asc" | "desc">("asc");
	const [orderBy, setOrderBy] = useState<"username" | "email">("username");

	useEffect(() => {
		dispatch(getDesigners({ page: page + 1, limit: rowsPerPage }));
	}, [dispatch, page, rowsPerPage]);

	console.log(designers.results);

	const handleRequestSort = (property: "username" | "email") => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);
		setRowsPerPage(value);
		setPage(0);
	};

	const sortData = (data: typeof designers.results) => {
		if (!data) return [];
		return data.slice().sort((a, b) => {
			if (orderBy) {
				if (order === "asc") {
					return a[orderBy] < b[orderBy] ? -1 : 1;
				} else {
					return a[orderBy] > b[orderBy] ? -1 : 1;
				}
			}
			return 0;
		});
	};

	const sortedData = sortData(designers.results);

	return (
		<TableContainer component={Paper}>
			<Table>
				<DesignerTableHead
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
				/>
				<DesignerTableBody
					data={sortedData}
					loading={status === "loading"}
					rowsPerPage={rowsPerPage}
				/>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={designers.count || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={(_, newPage) => setPage(newPage)}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default DesignerTable;
