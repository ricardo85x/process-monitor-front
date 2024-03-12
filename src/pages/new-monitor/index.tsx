import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { HistorySize, Process } from "./types";
import * as C from "./components";

const DEFAULT_HISTORY_SIZE: HistorySize = "replace";


export const NewMonitorPage = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [historySize, setHistorySize] = useState<HistorySize>(DEFAULT_HISTORY_SIZE);
    const [currentProcess, setCurrentProcess] = useState<Process[]>([]);

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

        function handleCurrentProcess(values: Process[]) {
            values.sort((a, b) => b.id - a.id)
            setCurrentProcess(values.map(p => ({ ...p, isNew: true })));
            setShowNewProcessAnimation(true);
            setTimeout(() => setShowNewProcessAnimation(false), 2000);
        }


        function handleNewProcesses(values: Process[]) {

            setCurrentProcess(
                prev => {
                    const newValues = values.map(p => ({ ...p, isNew: true }));
                    const prevValues = 
                        prev.filter(p => !values.some(v => v.id === p.id))
                            .map(p => ({ ...p, isNew: false }));
                    const all = [...newValues, ...prevValues]

                    all.sort((a, b) => b.id - a.id)
                    return all
                }
                
            );

            setShowNewProcessAnimation(true);
            setTimeout(() => setShowNewProcessAnimation(false), 2000);
        }

        function handleRemovedProcesses(values: Process[]) {

            setCurrentProcess(prev => prev.filter(p => !values.some(v => v.id === p.id)));

            setRemovedProcesses(
                prev => [
                    ...values.map(p => ({ ...p, isNew: true })),
                    ...prev.map(p => ({ ...p, isNew: false }))
                ].slice(0, historySize === 'replace' ? values.length : historySize));
            setShowRemovedProcessAnimation(true);
            setTimeout(() => setShowRemovedProcessAnimation(false), 2000);
        }

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('currentProcess', handleCurrentProcess);
        socket.on('newProcess', handleNewProcesses);
        socket.on('removedProcess', handleRemovedProcesses);

        return () => {
            console.log('reconectando')
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('currentProcess', handleCurrentProcess);
            socket.off('newProcess', handleNewProcesses);
            socket.off('removedProcess', handleRemovedProcesses);
        };
    }, [historySize]);

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            <C.Header isConnected={isConnected} animate={showNewProcessAnimation || showRemovedProcessAnimation} historySize={historySize} onHistorySizeChange={handleHistorySizeChange} />
            <div className="mt-20 bg-gray-800 overflow-y-auto" style={{ paddingTop: "68px" }}>
                <C.MonitorService newProcesses={currentProcess} removedProcesses={removedProcesses} showNewProcessAnimation={showNewProcessAnimation} showRemovedProcessAnimation={showRemovedProcessAnimation} />
            </div>
        </div>
    );
}





