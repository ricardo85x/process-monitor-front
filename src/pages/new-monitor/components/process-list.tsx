import { Process } from "../types";

type ProcessListProps = {
    title: string;
    processes: Process[];
    animation: boolean;
    type: "new" | "ended";
};

export const ProcessList: React.FC<ProcessListProps> = ({ title, processes, animation, type }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">{title}</div>
            {processes.map((process) => (
                <div key={process.id} className={`rounded-lg shadow-md flex min-w-72 ${type === 'new' ? 'bg-green-700' : 'bg-red-700'} ${animation && process.isNew ? 'animate-pulse' : ''}  `}>
                    <div className={`w-fit p-4 ${type === 'new' ? 'bg-green-800' : 'bg-red-800'} rounded-l-lg flex justify-center items-center`}>
                        <div className="text-sm">{process.id}</div>
                    </div>
                    <div className={`flex-grow p-4 ${type === 'new' ? 'bg-green-700' : 'bg-red-700'}  rounded-r-lg`}>
                        <div className="font-bold">{process.name}</div>
                        <div className="text-sm">{new Date(process.date).toLocaleString()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
