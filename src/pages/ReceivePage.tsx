import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { addToRequestQueue, sendMessage } from "@/services/contractService";
import { environment } from "@/enviroment/environment";
import Navbar from "@/components/Navbar/Navbar";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {
	Box,
	Button,
	MenuItem,
	Select,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Input,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import Footer from "@/components/Footer/Footer";
import { Crumb } from "@/interfaces/interfaces";


export default function ReceivePage() {

	const account = useAccount();
	const [taskName, setTaskName] = useState('');
	const [crumbLevel, setCrumbLevel] = useState('LOW');
	const [crumbAlias, setCrumbAlias] = useState('');
	const [crumbSetup, setCrumbSetup] = useState<Record<string, any> | null>(null);
	const [crumbReward, setCrumbReward] = useState('');
	const [crumbTimeout, setCrumbTimeout] = useState('');
	const [fileError, setFileError] = useState('');
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [crumbSetupTable, setCrumbSetupTable] = useState<Crumb[] | null>(null);
	useEffect(() => {
		if (crumbSetup && Array.isArray(crumbSetup)) {
			const sum = crumbSetup.reduce((acc, crumb) => acc + crumb.price, 0);
			setTotalPrice(sum);
		} else {
			setTotalPrice(0);
		}
	}, [crumbSetup]);


	const handleSetupFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const text = await file.text();
			const json = JSON.parse(text);

			if (!Array.isArray(json)) {
				throw new Error('JSON root must be an array');
			}

			const isValid = json.every(
				(item) =>
					typeof item.alias_name === 'string' &&
					typeof item.price === 'number' &&
					typeof item.status === 'string' &&
					typeof item.setup_task === 'string' &&
					typeof item.setup_validation === 'string' &&
					typeof item.result === 'string' &&
					typeof item.assignee === 'string' &&
					typeof item.max_run === 'number'
			);

			if (!isValid) {
				throw new Error('One or more items are not valid crumbs');
			}
			const mapped: Crumb[] = json.map((item, idx) => {
				if (
					typeof item.alias_name !== 'string' ||
					typeof item.price !== 'number' ||
					typeof item.setup_task !== 'string' ||
					typeof item.setup_validation !== 'string' ||
					typeof item.max_run !== 'number'
				) {
					throw new Error(`Item ${idx} is not a valid crumb`);
				}
				return {
					address: item.address ?? '',
					id: (item.id ?? `0x${crypto.randomUUID()}`) as `0x${string}`,
					aliasName: item.alias_name,
					price: BigInt(item.price),
					setupTask: item.setup_task,
					setupValidation: item.setup_validation,
					maxRun: item.max_run.toString(),
					lastUpdated: new Date().toISOString(),
					subContractAddress:
						(item.sub_contract_address ??
							'0x0000000000000000000000000000000000000000') as `0x${string}`,
				};
			});
			setCrumbSetupTable(mapped)
			setCrumbSetup(json);
			setFileError('');
		} catch (err: any) {
			setCrumbSetup(null);
			setFileError(`Invalid JSON: ${err.message}`);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!crumbSetup) {
			setFileError('Please upload a valid JSON setup file.');
			return;
		}

		const payload = {
			taskName,
			crumb: {
				level: crumbLevel,
				alias: crumbAlias,
				reward: crumbReward,
				timeout: crumbTimeout,
			},
			setup: crumbSetup,
		};

		console.log('Crumb submitted:', payload);
	};

	const doWrite = async () => {
		console.log("Writing to contract");
		if (!account.address) return;
		console.log(crumbSetup)
		const hash = await addToRequestQueue(account.address, crumbSetup ? JSON.stringify(crumbSetup) : "{}", totalPrice.toString());
	};

	return (
		<div >
			<div className="conected-hero-section history">
				<Navbar></Navbar>

				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2, width: 800 }}>
					<Typography variant="h6">Create Job</Typography>

					<FormControl fullWidth sx={{ mb: 2 }}>
						<Typography variant="body2" sx={{ mb: 1 }}>
							Upload Crumb Setup (JSON file)
						</Typography>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								border: '1px solid',
								borderColor: 'divider',
								borderRadius: 1,
								px: 2,
								py: 1.5,
							}}
						>
							<UploadFileIcon color="action" />
							<Input
								type="file"
								inputProps={{ accept: '.json' }}
								onChange={handleSetupFileUpload}
								disableUnderline
								sx={{ flex: 1 }}
							/>
						</Box>

						{fileError && (
							<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
								<ErrorIcon color="error" sx={{ mr: 1 }} />
								<Typography variant="body2" color="error">
									{fileError}
								</Typography>
							</Box>
						)}

						{crumbSetup && (
							<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
								<CheckCircleIcon color="success" sx={{ mr: 1 }} />
								<Typography variant="caption" color="success.main">
									{crumbSetup.length} crumbs loaded successfully
								</Typography>
							</Box>
						)}
					</FormControl>
					{crumbSetup && (
						<Table sx={{ mt: 3 }} >
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Alias</TableCell>
									<TableCell align="right">Price</TableCell>

									<TableCell align="right">Max&nbsp;Run</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{crumbSetupTable?.map((c, i) => (
									<TableRow key={c.id}>
										<TableCell>{i + 1}</TableCell>
										<TableCell>{c.aliasName}</TableCell>
										<TableCell align="right">
											{Number(c.price).toLocaleString()}
										</TableCell>

										<TableCell>
											{c.maxRun !== undefined ? `${Number(c.maxRun) * 100} hours` : 'N/A'}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}

					<Button type="submit" variant="contained" color="primary" onClick={doWrite}>
						Submit Job
					</Button>

					<br />


				</Box>

			</div><div className="history-footer"><Footer ></Footer></div>
		</div >
	);
}