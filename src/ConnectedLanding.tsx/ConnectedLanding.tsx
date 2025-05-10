
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deployStorageContract, getMessages } from "@/services/contractService";
import os from 'os';
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
import "./ConnectedLanding.css";
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from "@mui/x-charts";
import Footer from "@/components/Footer/Footer";
const sampleData = [
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Donut", calories: 452, fat: 25.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Donut", calories: 452, fat: 25.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Donut", calories: 452, fat: 25.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Donut", calories: 452, fat: 25.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
];
export default function ConnectedLanding() {
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
    const [messages, setMessages] = useState<any[]>([]);

    const [nodes, setNodes] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("");
    useConnect();
    useWalletClient();

    useEffect(() => {
        handleReadMasterContract();
    }, []);


    const handleReadMasterContract = async () => {

        try {
            const result = await getMessages(environment.mainContractName, environment.mainTopic);
            setNodes(result as any[]);

        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    };

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
            <section className="conected-hero-section">
                <div >
                    <h1 className="hero-title-c">My stats for {account.chain?.name}</h1>
                    <div >
                        <div className="hero-content-c"> 
            
                            <Box className="box-align">
                                <h1 className="hero-subtitle-c">CPU/RAM usage</h1>
                                <Gauge width={100} height={100} value={Math.random() * (60 - 34) + 34} />
                            </Box>
                                <Box className="box-align">
                                <h1 className="hero-subtitle-c">New Tasks posted</h1>
                                <Gauge width={100} height={100} value={Math.random() * (60 - 34) + 34} />
                            </Box>
                                  <Box className="box-align">
                                <h1 className="hero-subtitle-c">Owned tasks</h1>
                                <Gauge width={100} height={100} value={Math.random() * (60 - 34) + 34} />
                            </Box>
                        </div>
                        <h1 className="hero-subtitle-c">Token usage</h1>
                        <BarChart
                            title=" Usage"
                            series={[
                                { data: [35, 1, 0, 0] },



                            ]}
                            height={290}
                            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
                        /></div>
                    <h1 className="hero-title-c">Available tasks</h1>

                    <CustomPaginationActionsTable data={sampleData} />
                    <div>

                        {/* <label>
                            Contract Address:
                            <input
                                type="text"
                                value={contractAddress || ""}
                                onChange={(e) => setContractAddress(e.target.value as `0x${string}`)}
                                placeholder="0x..."
                            />
                        </label> */}
                        <ul>
                            {nodes.map((node, i) => (
                                <li key={i}>
                                    <strong>Sender:</strong> {node.sender}<br />
                                    <strong>Time:</strong> {new Date(Number(node.timestamp) * 1000).toLocaleString()}<br />
                                    <strong>Content:</strong> {node.content}
                                </li>
                            ))}
                        </ul>
                        {/* <br />
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
                        </div> */}

                        {/* <hr />

                <button type="button" onClick={doDeploy}>Deploy</button>
                {deployHash}
                <br />
                {deployTxError && <>Deploy Error: {deployTxError.message}<br /></>}
                <>
                    Contract: <span id="deployContractAddress">{deployReceipt?.contractAddress}</span>

                </> */}

                    </div>
                    <br />
                </div> </section>
            <Footer></Footer>
        </Box>
    );
}
