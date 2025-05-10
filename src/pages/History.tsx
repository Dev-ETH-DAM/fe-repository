import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getMessages } from "@/services/contractService";
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
import { BarChart } from '@mui/x-charts/BarChart';
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
export default function History() {

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

    return (
        <div>
            <Box>
                <Navbar></Navbar>
                <section className="conected-hero-section">
                    <div ><h1 className="hero-title-c">Solved tasks</h1>
                        <CustomPaginationActionsTable data={sampleData} />
                        <Box mt={10} mb={2} >
                             <h1 className="hero-subtitle-c">Solved issues per last 3 tasks</h1>
                            <BarChart
                                xAxis={[{ data: ['Task A', 'Task B', 'Task C'] }]}
                                series={[{ data: [1, 2, 5] }]}
                                height={400}

                            /></Box>

                        <div>
                            <ul>
                                {nodes.map((node, i) => (
                                    <li key={i}>
                                        <strong>Sender:</strong> {node.sender}<br />
                                        <strong>Time:</strong> {new Date(Number(node.timestamp) * 1000).toLocaleString()}<br />
                                        <strong>Content:</strong> {node.content}
                                    </li>
                                ))}
                            </ul>


                        </div>
                        <br />
                    </div> </section>
                <Footer></Footer>
            </Box></div>
    );
}