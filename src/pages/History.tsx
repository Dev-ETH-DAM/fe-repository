import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getCompletedQueue, getCrumbsByStatus, getMessages } from "@/services/contractService";
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
import { ComputeTask, Crumb } from "@/interfaces/interfaces";

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

    const account = useAccount();
    const [crumbs, setCrumbs] = useState<Crumb[]>([]);
    const [nodes, setNodes] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("");
    const [newContracts, setNewContracts] = useState<number>(0);
  const [aliasNames, setAliasNames] = useState<string[]>([]);
    const [serviceCounts, setServiceCounts] = useState<number[]>([]);
    useConnect();
    useWalletClient();
    const hasLoadedRef = useRef(false);
    useEffect(() => {
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        handleReadMasterContract();
    }, []);


    const handleReadMasterContract = async () => {
        try {

            const result = await getCompletedQueue();
            const nodes = result as unknown as ComputeTask[];
            setNodes(nodes);
            const allCrumbs: Crumb[] = [];
            for (let node of nodes) {
                const address = node.subContractAddress;


                if (!address || address === '0x0000000000000000000000000000000000000000') continue;

                try {
                    const crumbs = await getCrumbsByStatus(address,3);

                    const mappedCrumbs = crumbs as Crumb[];
                    for (let crumb of mappedCrumbs) {
                        crumb.subContractAddress = node.subContractAddress;
                    }

                    allCrumbs.push(...mappedCrumbs);
                } catch (err) {
                    console.warn(`Failed to read crumbs from ${address}:`, err);
                }
            }
            const threeHoursAgo = Math.floor(Date.now() / 1000) - 3 * 3600;

            const newContractsCount = allCrumbs.filter(
                (crumb) => Number(crumb.lastUpdated) >= threeHoursAgo
            ).length;

            setNewContracts(newContractsCount);
            setCrumbs(allCrumbs);
            const aliasCounts: Record<string, number> = {};
   

            allCrumbs.forEach((crumb) => {
                const alias = crumb.aliasName;
                aliasCounts[alias] = (aliasCounts[alias] || 0) + 1;
            });

            setAliasNames(Object.keys(aliasCounts));
            setServiceCounts(Object.values(aliasCounts));
            allCrumbs.forEach((crumb) => {
                const alias = crumb.aliasName;
                aliasCounts[alias] = (aliasCounts[alias] || 0) + 1;
            });


        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    };


    return (
        <div className="width">
            <Box>
                <Navbar></Navbar>
                <section className="conected-hero-section">
                    <div ><h1 className="hero-title-c">Solved tasks</h1>
                            {crumbs.length === 0 ? (
                                                <p style={{ marginTop: '1rem', color: '#666' }}>
                                                    No completed tasks. Please stand post a new one with appropriate pricing in order to maximize the chances of the task being taken and solved.
                                                </p>
                                            ) : (
                                                <CustomPaginationActionsTable data={crumbs} hideTable={true} />
                                            )}
                        <Box mt={10} mb={2} >
                             <h1 className="hero-subtitle-c">Solved issues</h1>
                              <BarChart
                                                      title="Usage"
                                                      height={290}
                                                      xAxis={[{ data: aliasNames }]}
                                                      series={[{ data: serviceCounts }]}
                                                  />
                            </Box>
{/* 
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


                        </div> */}
                        <br />
                    </div> </section>
                <Footer></Footer>
            </Box></div>
    );
}