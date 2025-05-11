
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getCrumbsByRequester, getCrumbsByStatus, getInProgressQueue, getMessages, getRequestQueue } from "@/services/contractService";
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
export default function ConnectedLanding() {
    const account = useAccount();
    const [crumbs, setCrumbs] = useState<Crumb[]>([]);
    const [nodes, setNodes] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("");
    const [newContracts, setNewContracts] = useState<number>(0);
    const [myContracts, setMyContracts] = useState<number>(0);
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

            const result = await getInProgressQueue();
            const nodes = result as unknown as ComputeTask[];
            setNodes(nodes);
            const allCrumbs: Crumb[] = [];
            for (let node of nodes) {
                const address = node.subContractAddress;


                if (!address || address === '0x0000000000000000000000000000000000000000') continue;
                const crumbsAssignedToMe = await getCrumbsByRequester(address);
                const mappedCrumbsAssignedToMe = crumbsAssignedToMe as Crumb[];

                setMyContracts(myContracts + mappedCrumbsAssignedToMe.length)
                try {
                    const crumbs = await getCrumbsByStatus(address,0);

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
                                <h1 className="hero-subtitle-c">New Tasks posted</h1>
                                <Gauge width={100} height={100} value={newContracts} />
                            </Box>
                            <Box className="box-align">
                                <h1 className="hero-subtitle-c">Owned tasks</h1>
                                <Gauge width={100} height={100} value={myContracts} />
                            </Box>
                        </div>
                        <h1 className="hero-subtitle-c">Available services </h1>
                        <BarChart
                            title="Usage"
                            height={290}
                            xAxis={[{ data: aliasNames }]}
                            series={[{ data: serviceCounts }]}
                        />
                    </div>


                    <h1 className="hero-title-c">Available tasks</h1>

                    {crumbs.length === 0 ? (
                        <p style={{ marginTop: '1rem', color: '#666' }}>
                            No crumbs available at the moment. Please stand by to get some updates or post a task to be executed.
                        </p>
                    ) : (
                        <CustomPaginationActionsTable data={crumbs} hideTable={false} />
                    )}
                    <div>




                    </div>
                    <br />
                </div> </section>
            <Footer></Footer>
        </Box>
    );
}
