
import { HistorySize } from "../types";

type HeaderProps = {
    isConnected: boolean;
    animate: boolean;
    historySize: HistorySize; 
    onHistorySizeChange: (size: HistorySize) => void
};



export const Header: React.FC<HeaderProps> = ({ isConnected, animate, historySize, onHistorySizeChange }) => {
    const handleHistorySizeChange = (value: HistorySize) => {
        onHistorySizeChange(value);
    };

    const handleGoToV2 = () => {
        window.location.href = '/';
    };

    return (
        <div className="bg-gray-900 text-white py-4 px-6 w-full fixed top-0 z-10 flex justify-between items-center">
            <div className="flex items-center">
                <div className={`rounded-full w-4 h-4 mr-2 ${animate ? "animate-pulse" : ""} ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <div onClick={handleGoToV2} className="cursor-pointer text-lg font-bold">System monitor v1</div>
            </div>
            <div className="flex items-center">
                <label className="mr-2 text-lg">History</label>
                <select value={historySize} onChange={(e) => handleHistorySizeChange(e.target.value as HistorySize)} className=" text-white  bg-gray-600 rounded-lg px-2 py-1">
                    <option value="replace">Live</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={500}>500</option>
                </select>
            </div>
        </div>
    );
};