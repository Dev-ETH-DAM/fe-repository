
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deployStorageContract, getMessages } from "@/services/contractService";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useTransaction,
    useWaitForTransactionReceipt,
    useWalletClient,
} from "wagmi";
import { environment } from "@/enviroment/environment";
import Navbar from "@/components/Navbar/Navbar";
import CustomPaginationActionsTable from "@/components/Table/Table";
const sampleData = [
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Donut", calories: 452, fat: 25.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
    // ...
];
export default function ConnectedLanding() {
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
    const [messages, setMessages] = useState<any[]>([]);

    const [nodes, setNodes] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("");
    console.log("2")
    useConnect();
    useWalletClient();
    console.log("3")
    // useEffect(() => {
    //     console.log("another req")
    //     handleReadMasterContract();
    // }, []);

    const handleReadMasterContract = async () => {

        try {
            const result = await getMessages(environment.mainContractName, environment.mainTopic);
            setNodes(result as any[]);

        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    };
    // const [deployHash, setDeployHash] = useState<`0x${string}` | undefined>();


    // const { data: deployReceipt, error: deployTxError } = useWaitForTransactionReceipt({
    //     hash: deployHash,
    //     confirmations: 1,
    // });

    // useEffect(() => {
    //     if (deployReceipt?.contractAddress) {
    //         setContractAddress(deployReceipt.contractAddress);
    //     }
    // }, [deployReceipt]);

    // const doDeploy = async () => {
    //     const hash = await deployStorageContract();
    //     if (hash) {
    //         console.log("Deploy hash set to", hash);
    //         setDeployHash(hash);
    //     }
    // };


    const handleRead = async () => {
        if (!contractAddress) {
            setStatus("No contract address");
            return;
        }

        setStatus("Reading...");
        try {
            const result = await getMessages(contractAddress, "cacao");
            setMessages(result as any[]);
            setStatus("Done");
        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <Box>
            <Navbar></Navbar>
            <section className="hero-section">
                <div >
                    <CustomPaginationActionsTable data={sampleData} />
                    <div>

                        <label>
                            Contract Address:
                            <input
                                type="text"
                                value={contractAddress || ""}
                                onChange={(e) => setContractAddress(e.target.value as `0x${string}`)}
                                placeholder="0x..."
                            />
                        </label>
                        <ul>
                            {nodes.map((node, i) => (
                                <li key={i}>
                                    <strong>Sender:</strong> {node.sender}<br />
                                    <strong>Time:</strong> {new Date(Number(node.timestamp) * 1000).toLocaleString()}<br />
                                    <strong>Content:</strong> {node.content}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <div>
                            status: {account.status}
                            <br />
                            {account.addresses?.[0] && (
                                <>
                                    address: <span id="accountAddress">{account.addresses[0]}</span>
                                    <br />
                                </>
                            )}
                            chainId: {account.chainId}
                            {account.chain && <span>&nbsp;({account.chain?.name})</span>}
                        </div>

                        {/* <hr />

                <button type="button" onClick={doDeploy}>Deploy</button>
                {deployHash}
                <br />
                {deployTxError && <>Deploy Error: {deployTxError.message}<br /></>}
                <>
                    Contract: <span id="deployContractAddress">{deployReceipt?.contractAddress}</span>

                </> */}
                        <Button variant="contained" onClick={handleRead}>
                            Read Messages
                        </Button>
                        {status && <p>{status}</p>}
                        <ul>
                            {messages.map((msg, i) => (
                                <li key={i}>
                                    <strong>Sender:</strong> {msg.sender}<br />
                                    <strong>Time:</strong> {new Date(Number(msg.timestamp) * 1000).toLocaleString()}<br />
                                    <strong>Content:</strong> {msg.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <p>Your wallet is connected. You can now send and receive messages.</p> */}
                    <Button variant="outlined" onClick={() => disconnect()}>
                        Disconnect Wallet
                    </Button>
                    <br />
                    <Link to="/receive">Go to Receive</Link></div> </section>
        </Box>
    );
}
