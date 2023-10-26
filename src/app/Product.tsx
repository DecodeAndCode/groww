"use client";
import {ProductHeader} from "@/app/ProductHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import {Chart} from "@/app/ChartComponent";

export function Product() {
    const [Symbol, setSymbol] = useState("");
    const [Description, setDescription] = useState("");
    const [Name, setName] = useState("");
    const [AssetType, setAssetType] = useState("");
    const [Sector, setSector] = useState("");
    const [Exchange, setExchange] = useState("");
    const [ProfitMargin, setProfitMargin] = useState("");
    const [CIK,setCIK] = useState("");

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
            setCIK(res.data.CIK);
            setProfitMargin(res.data.ProfitMargin)
        });
    },[]);

    return <div>
        <ProductHeader AssetType={AssetType} Symbol={Symbol} Name={Name} Exchange={Exchange} ProfitMargin={ProfitMargin} CIK={CIK}/>
        <Chart/>
    </div>
}