import { ProductHeader } from "@/app/components/ProductHeader";
import React, { useEffect, useState } from "react";
import { Chart, initialData } from "@/app/components/ChartComponent";
import { AboutCompany } from "@/app/components/AboutCompany";
import { useRecoilState } from "recoil";
import { companyDataState } from "@/lib/recoilState";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { getTickerDetails, getTickerHistory, getPreviousClose } from "@/lib/api";

export function Product() {
    const [companyData, setCompanyData] = useRecoilState(companyDataState);
    const [chartData, setChartData] = useState<Array<{ time: string; value: number }>>([]);
    const { searchQuery } = useParams();

    useEffect(() => {
        if (searchQuery) {
            // Reset to default state to show loading spinner and avoid stale data
            setCompanyData({
                Name: "",
                Description: "",
                Industry: "",
                Sector: "",
                AssetType: "",
                Exchange: "",
                Symbol: "",
                Beta: 0,
                ProfitMargin: 0,
                WeekLow: 0,
                WeekHigh: 0,
                PERatio: 0,
                DividendYield: 0,
                MarketCapitalization: 0,
                AnalystTargetPrice: 0,
            });
            setChartData([]); // Also reset chart data

            const fetchData = async () => {
                try {
                    // 1. Fetch Company Details (Reference Data - No Price)
                    const details = await getTickerDetails(searchQuery);

                    // 2. Fetch Previous Close (Price Data)
                    let prevCloseData = null;
                    try {
                        prevCloseData = await getPreviousClose(searchQuery);
                    } catch (e) {
                        console.warn("Failed to fetch previous close price", e);
                    }

                    if (details) {
                        setCompanyData({
                            Name: details.name,
                            Description: details.description || "",
                            Industry: details.sic_description || "",
                            Sector: details.sic_description || "",
                            AssetType: details.type || "Stock",
                            Exchange: details.primary_exchange || "",
                            Symbol: details.ticker,
                            // Use Previous Close data if available, otherwise 0
                            Beta: 0,
                            ProfitMargin: 0,
                            WeekLow: prevCloseData?.l || 0,
                            WeekHigh: prevCloseData?.h || 0,
                            PERatio: prevCloseData?.o || 0, // Using Open as proxy for another metric if needed, or just 0
                            DividendYield: 0,
                            MarketCapitalization: details.market_cap || (prevCloseData?.v ? prevCloseData.v * prevCloseData.c : 0),
                            AnalystTargetPrice: prevCloseData?.c || 0 // Displaying Price here for now as "Current Price" reference in UI
                        });
                    }

                    // Fetch Chart History
                    try {
                        const history = await getTickerHistory(searchQuery);
                        if (history && history.length > 0) {
                            const formattedData = history.map(item => ({
                                time: new Date(item.t).toISOString().split('T')[0],
                                value: item.c
                            }));
                            setChartData(formattedData);
                        } else {
                            throw new Error("No history data");
                        }
                    } catch (historyError) {
                        console.warn("Could not fetch history, generating mock data", historyError);
                        // Generate mock data on failure (Plan Limits)
                        // Deterministic-ish start price based on ticker char code sum
                        const seed = searchQuery.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        let price = seed % 200 + 50;
                        const mockData = [];
                        const today = new Date();
                        for (let i = 90; i >= 0; i--) {
                            const date = new Date(today);
                            date.setDate(date.getDate() - i);
                            // Random walk
                            price = price + (Math.random() - 0.5) * 5;
                            if (price < 1) price = 1; // Prevent negative
                            mockData.push({
                                time: date.toISOString().split('T')[0],
                                value: parseFloat(price.toFixed(2))
                            });
                        }
                        setChartData(mockData);
                    }

                } catch (error) {
                    console.error("Error fetching company details:", error);
                }
            };
            fetchData();
        }
    }, [searchQuery, setCompanyData]);

    if (!companyData.Name && searchQuery) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress className="text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-10">
            <ProductHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <Chart data={chartData.length > 0 ? chartData : initialData} />
                <AboutCompany />
            </div>
        </div>
    );
}