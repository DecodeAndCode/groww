import React from "react";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { companyDataState } from "@/lib/recoilState";

export function ProductHeader() {

    const companyData = useRecoilValue(companyDataState);

    // Fallback if no data (though usually navigated with data)
    if (!companyData || !companyData.Symbol) return null;

    const isPositiveMargin = parseFloat(companyData.ProfitMargin) >= 0;

    return (
        <div className="bg-white shadow-sm border-b border-gray-100 py-6 px-4 mb-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white border border-gray-200 p-2 shadow-sm overflow-hidden relative">
                        <img
                            src={`https://financialmodelingprep.com/image-stock/${companyData.Symbol}.png`}
                            alt={companyData.Symbol}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${companyData.Symbol}&background=random`
                            }}
                        />
                    </div>
                    <div>
                        <div className="flex items-baseline space-x-3">
                            <Typography variant="h4" className="font-bold text-gray-900 tracking-tight">
                                {companyData.Name}
                            </Typography>
                            <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded text-sm">
                                {companyData.Symbol}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
                            <span>{companyData.Exchange}</span>
                            <span>•</span>
                            <span>{companyData.AssetType}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="bg-gray-50 rounded-xl p-4 min-w-[150px]">
                        <div className="text-sm text-gray-500 mb-1">Analyst Target</div>
                        <div className="text-2xl font-bold text-gray-900">
                            ${companyData.AnalystTargetPrice}
                        </div>
                    </div>
                    {/* Profit Margin if needed, though Analyst Target is what was there. 
                        Let's keep Profit Margin too but style it. 
                    */}
                    <div className={`mt-2 font-bold flex items-center ${isPositiveMargin ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="text-sm mr-2 text-gray-500 font-medium">Margin:</span>
                        {isPositiveMargin ? '+' : ''}{companyData.ProfitMargin}%
                    </div>
                </div>
            </div>
        </div>
    );
}