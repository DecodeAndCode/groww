"use client";
import {ProductHeader} from "@/app/ProductHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import {Chart, initialData} from "@/app/ChartComponent";
import {AboutCompany} from "@/app/AboutCompany";

export function Product() {
    const [Symbol, setSymbol] = useState("");
    const [Description, setDescription] = useState("");
    const [Name, setName] = useState("");
    const [AssetType, setAssetType] = useState("");
    const [Sector, setSector] = useState("");
    const [Exchange, setExchange] = useState("");
    const [ProfitMargin, setProfitMargin] = useState(0);
    const [AnalystTargetPrice,setAnalystTargetPrice] = useState(0);
    const [Industry, setIndustry] = useState("");
    const [Beta, setBeta] = useState(0);
    const [WeekHigh, setWeekHigh] = useState(0);
    const [WeekLow, setWeekLow] = useState(0);
    const [PERatio, setPERatio] = useState(0);
    const [DividendYield, setDividendYield] = useState(0);
    const [MarketCapitalization, setMarketCapitalization] = useState(0);

    useEffect(() => {
        axios.get(
            "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
        ).then((res) => {
            setAssetType(res.data.AssetType)
            setName(res.data.Name)
            setExchange(res.data.Exchange)
            setSector(res.data.Sector)
            setSymbol(res.data.Symbol)
            setDescription(res.data.Description)
            setAnalystTargetPrice(res.data.AnalystTargetPrice)
            setProfitMargin(res.data.ProfitMargin)
            setIndustry(res.data.Industry)
            setBeta(res.data.Beta)
            setWeekLow(res.data["52WeekLow"])
            setWeekHigh(res.data["52WeekHigh"])
            setPERatio(res.data.PERatio)
            setDividendYield(res.data.DividendYield)
            setMarketCapitalization(res.data.MarketCapitalization)
        });
    },[]);

    return <div>
        <ProductHeader AssetType={AssetType} Symbol={Symbol} Name={Name} Exchange={Exchange} ProfitMargin={ProfitMargin} AnalystTargetPrice={AnalystTargetPrice}/>
        <Chart data={initialData}/>
        <AboutCompany
            Name={Name}
            Description={Description}
            Industry={Industry}
            Sector={Sector}
            Beta={Beta}
            ProfitMargin={ProfitMargin}
            WeekLow={WeekLow}
            WeekHigh={WeekHigh}
            PERatio={PERatio}
            DividendYield={DividendYield}
            MarketCapitalization={MarketCapitalization}
            AnalystTargetPrice={AnalystTargetPrice}
        />
    </div>
}