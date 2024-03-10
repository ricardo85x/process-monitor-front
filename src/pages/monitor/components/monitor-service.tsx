import { Process } from "../types";
import { ProcessList } from "./process-list";

type MonitorServiceProps = {
    newProcesses: Process[];
    removedProcesses: Process[];
    showNewProcessAnimation: boolean;
    showRemovedProcessAnimation: boolean;
};

export const MonitorService: React.FC<MonitorServiceProps> = ({ newProcesses, removedProcesses, showNewProcessAnimation, showRemovedProcessAnimation }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-6 text-white max-w-2xl w-full mx-auto">
            <ProcessList title="New Processes" processes={newProcesses} animation={showNewProcessAnimation} type="new" />
            <ProcessList title="Ended Processes" processes={removedProcesses} animation={showRemovedProcessAnimation} type="ended" />
        </div>
    );
};
