import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@mui/material";
import { sendMessage } from "@/services/contractService";
import { environment } from "@/enviroment/environment";
import Navbar from "@/components/Navbar/Navbar";

export default function ReceivePage() {
    
	const account = useAccount();
	const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
    const [input, setInput] = useState<string>("");
	const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
	const [status, setStatus] = useState<string>("");

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
		<div>
             <Navbar></Navbar>
			<h2>Send MessagEEEEEe</h2>
            <input value={input}  onChange={(e) => setInput(e.target.value)}></input>
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
			{txHash && <p>Tx Hash: {txHash}</p>}
		</div>
	);
}