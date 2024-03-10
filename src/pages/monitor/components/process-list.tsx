import { Process } from "../types";

type ProcessListProps = {
    title: string;
    processes: Process[];
    animation: boolean;
    color: string;
};

export const ProcessListOld: React.FC<ProcessListProps> = ({ title, processes, animation, color }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">{title}</div>
            {processes.map((process) => (
                <div key={process.id} className={`flex min-w-72 bg-${color}-700 rounded-lg shadow-md ${animation && process.isNew ? "animate-pulse" : ""}`}>
                    <div className={`w-fit p-4 bg-${color}-800 rounded-l-lg flex justify-center items-center`}>
                        <div className="text-sm">{process.id}</div>
                    </div>
                    <div className="flex-grow p-4 bg-${color}-700 rounded-r-lg">
                        <div className="font-bold">{process.name}</div>
                        <div className="text-sm">{new Date(process.date).toLocaleString()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ProcessList: React.FC<ProcessListProps> = ({ title, processes, animation, color }) => {
    console.log('animation', animation)
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">{title}</div>
            {processes.map((process, index) => (
                <div key={process.id} style={{ transitionDelay: `${index * 0.1}s` }} className={`transition-all duration-300 flex min-w-72 bg-${color}-700 rounded-lg shadow-md `}>
                    <div className={`w-fit p-4 bg-${color}-800 rounded-l-lg flex justify-center items-center`}>
                        <div className="text-sm">{process.id}</div>
                    </div>
                    <div className="flex-grow p-4 bg-${color}-700 rounded-r-lg">
                        <div className="font-bold">{process.name}</div>
                        <div className="text-sm">{new Date(process.date).toLocaleString()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
