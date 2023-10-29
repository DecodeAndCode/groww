"use client";

import {CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ShowTab} from "@/app/ShowTab";
import {TopGainer} from "@/app/GStockCard";
import {TopLoser} from "@/app/LStockCard";

export function Explore() {
    // const [topGainers, setTopGainers] = useState([]);
    // const [topLosers, setTopLosers] = useState([]);

    const [topGainers, setTopGainers] = useState<TopGainer[]>([]);
    const [topLosers, setTopLosers] = useState<TopLoser[]>([]);

    useEffect(() => {
        axios.get(
            "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"
        ).then((res) => {
            setTopGainers(res.data.top_gainers);
            setTopLosers(res.data.top_losers);
        })
    }, []);

    if (topGainers.length === 0) {
        return <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress/>
        </div>
    }

    return <div style={{
        margin: 50
    }}>
        <ShowTab topGainers={topGainers} topLosers={topLosers}></ShowTab>
    </div>
}