import {CircularProgress} from "@mui/material";
import React, {useEffect} from "react";
import axios from "axios";
import {ShowTab} from "@/app/components/ShowTab";
import {topGainersState, topLosersState} from "@/lib/recoilState";
import {useRecoilState} from "recoil";

export function Explore() {

    const [topGainers, setTopGainers] = useRecoilState(topGainersState);
    const [topLosers, setTopLosers] = useRecoilState(topLosersState);

    useEffect(() => {
        axios.get(
            "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"
        ).then((res) => {
            const topGainers = res.data.top_gainers;
            const topLosers = res.data.top_losers;

            setTopGainers(topGainers);
            setTopLosers(topLosers);
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