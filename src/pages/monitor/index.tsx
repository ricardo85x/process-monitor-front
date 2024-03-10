import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { HistorySize, Process } from "./types";
import * as C from "./components";

const DEFAULT_HISTORY_SIZE: HistorySize = 'replace';


export const MonitorPage = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [historySize, setHistorySize] = useState<HistorySize>(DEFAULT_HISTORY_SIZE);

    const [newProcesses, setNewProcesses] = useState<Process[]>([]);
    const [removedProcesses, setRemovedProcesses] = useState<Process[]>([]);
    const [showNewProcessAnimation, setShowNewProcessAnimation] = useState(false);
    const [showRemovedProcessAnimation, setShowRemovedProcessAnimation] = useState(false);

    const handleHistorySizeChange = (size: HistorySize) => {
        setHistorySize(size);
    };

    useEffect(() => {
        function handleConnect() {
            setIsConnected(true);
        }

        function handleDisconnect() {
            setIsConnected(false);
        }

        function handleNewProcesses(values: Process[]) {
            setNewProcesses(
                prev => [
                    ...values.map(p => ({ ...p, isNew: true })), 
                    ...prev.map(p => ({ ...p, isNew: false }))
                ].slice(0, historySize === 'replace'? values.length : historySize)
            );
            setShowNewProcessAnimation(true);
            setTimeout(() => setShowNewProcessAnimation(false), 2000);
        }

        function handleRemovedProcesses(values: Process[]) {
            setRemovedProcesses(
                prev => [
                    ...values.map(p => ({ ...p, isNew: true })), 
                    ...prev.map(p => ({ ...p, isNew: false }))
                ].slice(0, historySize === 'replace'? values.length : historySize));
            setShowRemovedProcessAnimation(true);
            setTimeout(() => setShowRemovedProcessAnimation(false), 2000);
        }

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('newProcess', handleNewProcesses);
        socket.on('removedProcess', handleRemovedProcesses);

        return () => {
            console.log('reconectando')
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('newProcess', handleNewProcesses);
            socket.off('removedProcess', handleRemovedProcesses);
        };
    }, [historySize]);

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            <C.Header isConnected={isConnected} animate={showNewProcessAnimation || showRemovedProcessAnimation} historySize={historySize} onHistorySizeChange={handleHistorySizeChange} />
            <div className="mt-20 bg-gray-800 overflow-y-auto" style={{ paddingTop: "68px" }}>
                <C.MonitorService newProcesses={newProcesses} removedProcesses={removedProcesses} showNewProcessAnimation={showNewProcessAnimation} showRemovedProcessAnimation={showRemovedProcessAnimation} />
            </div>
        </div>
    );
}





