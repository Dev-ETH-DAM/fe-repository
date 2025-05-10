import { useState } from "react";
import { useAccount } from "wagmi";
import { sendMessage } from "@/services/contractService";
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
} from '@mui/material';
import Footer from "@/components/Footer/Footer";


export default function ReceivePage() {

	const account = useAccount();
	const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
	const [input, setInput] = useState<string>("");
	const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
	const [status, setStatus] = useState<string>("");
	const [taskName, setTaskName] = useState('');
	const [crumbLevel, setCrumbLevel] = useState('LOW');
	const [crumbAlias, setCrumbAlias] = useState('');
	const [crumbSetup, setCrumbSetup] = useState<Record<string, any> | null>(null);
	const [crumbReward, setCrumbReward] = useState('');
	const [crumbTimeout, setCrumbTimeout] = useState('');
	const [fileError, setFileError] = useState('');
	const handleSetupFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const text = await file.text();
			const parsed = JSON.parse(text);
			setCrumbSetup(parsed);
			setFileError('');
		} catch (err) {
			console.log(err)
			setFileError('Invalid JSON file');
			setCrumbSetup(null);
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
			setup: crumbSetup, // This is the parsed JSON
		};

		console.log('Crumb submitted:', payload);
	};
	const handleSend = async () => {
		if (!account.address || !contractAddress) {
			setStatus("Missing account or contract address");
			return;
		}

		setStatus("Sending...");
		try {
			const randomContent = input;
			const hash = await sendMessage(account.address, contractAddress, environment.mainTopic, randomContent);
			setTxHash(hash);
			setStatus("Message sent!");
		} catch (err: any) {
			setStatus(`Error: ${err.message}`);
		}
	};

	return (
		<div >
			<div className="conected-hero-section history">
				<Navbar></Navbar>

				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2, width: 800 }}>
					<Typography variant="h6">Create Crumb</Typography>

					<TextField
						label="Task Name"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						required
					/>

					<FormControl fullWidth>
						<InputLabel>Crumb Level</InputLabel>
						<Select
							value={crumbLevel}
							label="Crumb Level"
							onChange={(e) => setCrumbLevel(e.target.value)}
						>
							<MenuItem value="LOW">LOW (2GB RAM, 2 Cores)</MenuItem>
							<MenuItem value="MID">MID (4GB RAM, 4 Cores)</MenuItem>
							<MenuItem value="HIGH">HIGH (8GB RAM, 8 Cores)</MenuItem>
						</Select>
					</FormControl>

					<TextField
						label="Crumb Alias"
						value={crumbAlias}
						onChange={(e) => setCrumbAlias(e.target.value)}
					/>

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
									JSON loaded with {Object.keys(crumbSetup).length} keys
								</Typography>
							</Box>
						)}
					</FormControl>
					<TextField
						label="Crumb Reward (e.g. credits, tokens)"
						value={crumbReward}
						onChange={(e) => setCrumbReward(e.target.value)}
						required
					/>

					<TextField
						label="Crumb Timeout (max run in hours)"
						type="number"
						inputProps={{ min: 1 }}
						value={crumbTimeout}
						onChange={(e) => setCrumbTimeout(e.target.value)}
						required
					/>

					<Button type="submit" variant="contained" color="primary">
						Submit Crumb
					</Button>
					{/* <h2>Send MessagEEEEEe</h2>
				<input value={input} onChange={(e) => setInput(e.target.value)}></input>
				<label>
					Contract Address:
					<input
						type="text"
						value={contractAddress || ""}
						onChange={(e) => setContractAddress(e.target.value as `0x${string}`)}
						placeholder="0x..."
					/>
				</label>
				<br />
				<Button variant="contained" onClick={handleSend}>
					Send Random Message
				</Button>
				{status && <p>{status}</p>}
				{txHash && <p>Tx Hash: {txHash}</p>} */}

				</Box>

			</div>
			<Footer></Footer></div>
	);
}