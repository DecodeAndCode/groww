import React, { useState } from "react";
import { StockCard, StockData } from "@/app/components/StockCard";
import TradingViewWidget from "@/app/components/TradingViewWidget";

interface TopGainer extends StockData { }
interface TopLoser extends StockData { }

export function ShowTab({ topGainers, topLosers }: { topGainers: TopGainer[], topLosers: TopLoser[] }) {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "Top Gainers", index: 0 },
        { label: "Top Losers", index: 1 },
        { label: "Popular Charts", index: 2 },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs Header */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
                    {tabs.map((tab) => (
                        <button
                            key={tab.index}
                            onClick={() => setActiveTab(tab.index)}
                            className={`
                                px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === tab.index
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {activeTab === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                        {topGainers.map((stock) => (
                            <StockCard key={stock.ticker} stock={stock} type="gainer" />
                        ))}
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                        {topLosers.map((stock) => (
                            <StockCard key={stock.ticker} stock={stock} type="loser" />
                        ))}
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="flex justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fadeIn h-[600px]">
                        <div className="w-full h-full">
                            <TradingViewWidget />
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

// Removing legacy TabPanel internal component as it is replaced by conditional rendering