import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getDesigners } from "../../store/slices/designersSlice";
import { Table, TableContainer, Paper, TablePagination } from "@mui/material";
import DesignerTableHead from "./DesignerTableHead/DesignerTableHead";
import DesignerTableBody from "./DesignerTableBody/DesignerTableBody";
import { useTranslation } from "react-i18next";

const debounce = (func: Function, wait: number)=> {
  let timeout: any;
  return function(...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
			// @ts-ignore
      func.apply(this, args);
    }, wait);
  };
};

const DesignerTable: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const designers = useSelector((state: RootState) => state.designers.list);
	const status = useSelector((state: RootState) => state.designers.status);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [order, setOrder] = useState<"asc" | "desc">("asc");
	const [orderBy, setOrderBy] = useState<"username" | "email">("username");
	const { t } = useTranslation();

	useEffect(() => {
		// @ts-ignore
		if (status === "idle" && (!designers.results || designers.results.length === 0)) dispatch(getDesigners({ page: page + 1, limit: rowsPerPage }));
	}, [dispatch, page, rowsPerPage]);

  const debouncedLoadDesigners = useCallback(
    debounce((newPage:any, newRowsPerPage: any) => {
			// @ts-ignore
      dispatch(getDesigners({ page: newPage + 1, limit: newRowsPerPage }));
    }, 300),
    [dispatch]
  );

	const handleChangePage = (_:never, newPage: number) => {
    setPage(newPage);
    debouncedLoadDesigners(newPage, rowsPerPage);
  };

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
				labelRowsPerPage={t("Rows Per Page")}
				labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t("of")} ${count !== -1 ? count : `more than ${to}`}`}
				page={page}
				onPageChange={handleChangePage as any}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default DesignerTable;
