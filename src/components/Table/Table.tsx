import * as React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	IconButton,
	Box,
	Button,
	TableHead,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Crumb } from "@/interfaces/interfaces";
import { updateCrumbToQueued } from "@/services/contractService";

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;
	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={(e) => onPageChange(e, page + 1)}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={(e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

interface Props {
	data: Crumb[];
	hideTable: boolean
}

export default function CustomPaginationActionsTable({ data, hideTable = false }: Props) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const doWrite = async (crumb: Crumb) => {
		console.log("Writing to contract to assign a crumb");
		if (!crumb.id || !crumb.subContractAddress || crumb.subContractAddress === '0x0000000000000000000000000000000000000000' || crumb.id === '0x0000000000000000000000000000000000000000') return;
		console.log(crumb);
		await updateCrumbToQueued(crumb.subContractAddress, crumb.id);
	};
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 800 }} aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell><strong>Service Name</strong></TableCell>
						<TableCell><strong>Price</strong></TableCell>
						<TableCell><strong>Max Nr. of processing hours</strong></TableCell>
						<TableCell><strong>Date Posted</strong></TableCell>
						<TableCell><strong>Assign to me</strong></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: data
					).map((crumb, i) => (
						<TableRow key={crumb.id || i}>
							<TableCell>{crumb.aliasName}</TableCell>
							<TableCell>
								{Number(crumb.price) < 1e14
									? '<0.0001 ETH'
									: `${(Number(crumb.price) / 1e18).toFixed(4)} ETH`}
							</TableCell>

							<TableCell>
								{crumb.maxRun !== undefined ? `${Number(crumb.maxRun)} hours` : 'N/A'}
							</TableCell>
							<TableCell>
								{new Date(Number(crumb.lastUpdated) * 1000).toLocaleString(undefined, {
									dateStyle: 'medium',
									timeStyle: 'short',
								})}
							</TableCell>
							{!hideTable && (                         /* ⬅️ only renders when FALSE */
								<TableCell>
									<Button onClick={() => doWrite(crumb)}>
										Process Crumb
									</Button>
								</TableCell>
							)}
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={4} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={4}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
							slotProps={{
								select: {
									inputProps: { "aria-label": "rows per page" },
									native: true,
								},
							}}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}