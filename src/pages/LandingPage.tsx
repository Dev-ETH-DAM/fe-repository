// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useTransaction,
    useWaitForTransactionReceipt,
    useWalletClient,
} from "wagmi";
// import { Button } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { isCalldataEnveloped } from "@oasisprotocol/sapphire-paratime";

// import {
//     deployStorageContract,
//     sendMessage,
//     getMessages,
// } from "@/services/contractService";
import ConnectedLanding from "@/ConnectedLanding.tsx/ConnectedLanding";
import DisconnectedLanding from "@/components/DisconnectedLanding/DisconnectedLanding";


export default function LandingPage() {
    const account = useAccount();

    // const { connectors, connect, status, error } = useConnect();
    // const { disconnect } = useDisconnect();
    // const { data: walletClient } = useWalletClient();

    // const [deployHash, setDeployHash] = useState<`0x${string}` | undefined>();
    // const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();
    // const [writeTxHash, setWriteTxHash] = useState<`0x${string}` | undefined>();
    // const [readResult, setReadResult] = useState<string | undefined>();

    // const { data: deployReceipt, error: deployTxError } = useWaitForTransactionReceipt({
    //     hash: deployHash,
    //     confirmations: 1,
    // });

    // const { data: writeReceipt, error: writeTxError } = useWaitForTransactionReceipt({
    //     hash: writeTxHash,
    //     confirmations: 1,
    // });

    // const { data: writeTxInfo } = useTransaction({
    //     hash: writeReceipt?.transactionHash,
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

    // const doWrite = async () => {
    //     if (!account.address || !contractAddress) return;
    //     const randomContent = `${BigInt(Math.round(Math.random() * 100000))}`;
    //     const result = await sendMessage(account.address, contractAddress, "cacao", "I love tils");
    //     setWriteTxHash(result);
    // };

    // const doRead = async () => {
    //     if (!contractAddress) return;
    //     const result = await getMessages(contractAddress, "cacao");
    //     console.log(result);
    //     const safeResult = JSON.stringify(result, (_, value) =>
    //         typeof value === "bigint" ? value.toString() : value
    //     );
    //     setReadResult(safeResult);
    // };
    return (
        <main>
        
                {account.status === "connected" ? <ConnectedLanding /> : <DisconnectedLanding />}
           
            {/* <>
                        <div>
                            <h2>Account</h2>
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
            
                            <hr />
            
                            <button type="button" onClick={doDeploy}>Deploy</button>
                            {deployHash}
                            <br />
                            {deployTxError && <>Deploy Error: {deployTxError.message}<br /></>}
                            <>
                                Contract: <span id="deployContractAddress">{deployReceipt?.contractAddress}</span>
                                <br />
                                <hr />
                                <button type="button" onClick={doWrite}>Write</button>
                                <br />
                                {writeTxHash && (
                                    <>
                                        Write Tx Hash: {writeTxHash}<br />
                                        {writeTxError && <>Write Tx Error: {writeTxError.message}<br /></>}
                                        {writeReceipt && (
                                            <>
                                                Write Tx Gas: {writeReceipt.gasUsed.toString()}<br />
                                                BlockHash: <span id="writeReceiptBlockHash">{writeReceipt.blockHash}</span><br />
                                                Calldata: <span id="isWriteEnveloped" data-testid="is-write-enveloped">
                                                    {isCalldataEnveloped(writeTxInfo?.input) ? "encrypted" : "plaintext"}
                                                </span>
                                            </>
                                        )}
                                    </>
                                )}
                                <hr />
                                <button type="button" onClick={doRead}>Read</button>
                                {readResult !== undefined && (
                                    <span id="readResult" data-testid="read-result">{readResult}</span>
                                )}
                                <br />
                            </>
            
                            <hr />
                            {account.status === "connected" && (
                                <button type="button" onClick={() => disconnect()}>Disconnect</button>
                            )}
                        </div>
            
                        <div>
                            <h2>Connect</h2>
                            <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
                            {connectors.map((connector: any) => (
                                <button key={connector.uid} onClick={() => connect({ connector })} data-testid={connector.id}>
                                    {connector.name}
                                </button>
                            ))}
                            <div>{status}</div>
                            <div>{error?.message}</div>
                        </div>
                    </> */}
        </main>
    );
}
