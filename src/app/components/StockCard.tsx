import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "next/image";

export interface StockData {
    ticker: string;
    price: string | number;
    change_percentage: string;
    change_amount: string;
}

interface StockCardProps {
    stock: StockData;
    type: "gainer" | "loser";
}

export function StockCard({ stock, type }: StockCardProps) {
    const navigate = useNavigate();
    const isGainer = type === "gainer";
    const colorClass = isGainer ? "text-emerald-600" : "text-rose-600";
    const bgClass = isGainer ? "bg-emerald-50" : "bg-rose-50";

    const handleClick = () => {
        // Navigate to product page, let it fetch the data
        navigate(`/product/${stock.ticker}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col"
        >
            <div className={`h-2 ${isGainer ? 'bg-emerald-500' : 'bg-rose-500'} w-full`} />

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-white p-1 shadow-sm">
                            <img
                                src={`https://financialmodelingprep.com/image-stock/${stock.ticker}.png`}
                                alt={stock.ticker}
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${stock.ticker}&background=random`
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{stock.ticker}</h3>
                            <span className="text-xs text-gray-500 font-medium">Stock</span>
                        </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-bold ${bgClass} ${colorClass}`}>
                        {stock.change_percentage}
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-bold text-gray-800">${stock.price}</span>
                    </div>
                    <div className={`text-sm font-medium mt-1 flex items-center ${colorClass}`}>
                        <span>{stock.change_amount}</span>
                        <span className="ml-1 text-xs opacity-75">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
