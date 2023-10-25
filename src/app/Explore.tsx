"use client";

import {Card, Tab, Tabs, Grid, Typography, CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {StockCard} from "@/app/GStockCard";
import {ShowTab} from "@/app/ShowTab";

export function Explore() {
    const [topGainers, setTopGainers] = useState([]);
    const [topLosers, setTopLosers] = useState([]);

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