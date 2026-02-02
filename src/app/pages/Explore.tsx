import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ShowTab } from "@/app/components/ShowTab";
import { topGainersState, topLosersState } from "@/lib/recoilState";
import { useRecoilState } from "recoil";
import { getTopGainers, getTopLosers, PolygonSnapshot, getPreviousClose } from "@/lib/api";
import { StockData } from "@/app/components/StockCard";

const MOCK_GAINERS: StockData[] = [
    { ticker: "AAPL", price: "259.48", change_percentage: "2.45%", change_amount: "6.20" },
    { ticker: "NVDA", price: "135.20", change_percentage: "3.12%", change_amount: "4.10" },
    { ticker: "MSFT", price: "430.15", change_percentage: "1.20%", change_amount: "5.10" },
    { ticker: "AMZN", price: "229.30", change_percentage: "1.80%", change_amount: "4.05" },
    { ticker: "META", price: "660.50", change_percentage: "2.10%", change_amount: "13.60" },
    { ticker: "AMD", price: "174.20", change_percentage: "4.50%", change_amount: "7.50" },
    { ticker: "TSLA", price: "405.50", change_percentage: "1.50%", change_amount: "6.00" },
    { ticker: "GOOGL", price: "190.10", change_percentage: "0.90%", change_amount: "1.70" },
];

const MOCK_LOSERS: StockData[] = [
    { ticker: "NFLX", price: "980.20", change_percentage: "-1.20%", change_amount: "-11.80" },
    { ticker: "ADBE", price: "538.10", change_percentage: "-2.10%", change_amount: "-11.50" },
    { ticker: "INTC", price: "19.50", change_percentage: "-1.50%", change_amount: "-0.30" },
    { ticker: "PYPL", price: "88.20", change_percentage: "-2.80%", change_amount: "-2.50" },
    { ticker: "ZM", price: "65.40", change_percentage: "-3.10%", change_amount: "-2.10" },
    { ticker: "DIS", price: "115.10", change_percentage: "-0.80%", change_amount: "-0.90" },
    { ticker: "NKE", price: "72.50", change_percentage: "-1.10%", change_amount: "-0.80" },
];

const POPULAR_TICKERS = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "AMD"];
const POPULAR_LOSERS = ["NFLX", "ADBE", "INTC", "PYPL", "ZM", "DIS", "NKE", "PFE"];

export function Explore() {
    const [topGainers, setTopGainers] = useRecoilState(topGainersState);
    const [topLosers, setTopLosers] = useRecoilState(topLosersState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // MOCK_GAINERS and MOCK_LOSERS moved outside component to avoid dependency issues

    useEffect(() => {
        const fetchRealMarketData = async () => {
            setLoading(true);
            try {
                const gainerPromises = POPULAR_TICKERS.map(async (ticker) => {
                    try {
                        const data = await getPreviousClose(ticker);
                        if (data) {
                            const change = data.c - data.o;
                            const changePercent = (change / data.o) * 100;
                            return {
                                ticker: ticker,
                                price: data.c.toFixed(2),
                                change_percentage: `${changePercent.toFixed(2)}%`,
                                change_amount: change.toFixed(2)
                            } as StockData;
                        }
                    } catch (e) { console.error(e); }
                    return null;
                });

                // Fetch "Losers" List (Other popular stocks for variety)
                const loserPromises = POPULAR_LOSERS.map(async (ticker) => {
                    try {
                        const data = await getPreviousClose(ticker);
                        if (data) {
                            const change = data.c - data.o;
                            const changePercent = (change / data.o) * 100;
                            return {
                                ticker: ticker,
                                price: data.c.toFixed(2),
                                change_percentage: `${changePercent.toFixed(2)}%`,
                                change_amount: change.toFixed(2)
                            } as StockData;
                        }
                    } catch (e) { console.error(e); }
                    return null;
                });

                const [gainersResults, losersResults] = await Promise.all([
                    Promise.all(gainerPromises),
                    Promise.all(loserPromises)
                ]);

                const validGainers = gainersResults.filter((r): r is StockData => r !== null);
                const validLosers = losersResults.filter((r): r is StockData => r !== null);

                // Fallback to Mock Data if API fails (likely due to Rate Limits, e.g. 429)
                if (validGainers.length === 0) {
                    console.warn("API Rate Limit Hit for Gainers. Falling back to Mock Data.");
                    setTopGainers(MOCK_GAINERS);
                } else {
                    setTopGainers(validGainers);
                }

                if (validLosers.length === 0) {
                    console.warn("API Rate Limit Hit for Losers. Falling back to Mock Data.");
                    setTopLosers(MOCK_LOSERS);
                } else {
                    setTopLosers(validLosers);
                }

            } catch (err) {
                console.error("Failed to fetch real market data", err);
                setError("Failed to load real market data");
            } finally {
                setLoading(false);
            }
        };

        fetchRealMarketData();
    }, [setTopGainers, setTopLosers]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <CircularProgress className="text-emerald-500" />
                    <p className="mt-4 text-gray-500 font-medium">Loading market data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[80vh] bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        Retry
                    </button>
                    <p className="mt-4 text-xs text-gray-400">Note: API rate limits are common with free keys.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Market Overview</h1>
                <p className="text-gray-500 text-lg">Track popular market movers today.</p>
            </div>
            <ShowTab topGainers={topGainers} topLosers={topLosers} />
        </div>
    );
}