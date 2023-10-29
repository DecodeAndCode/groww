import {ProductHeader} from "@/app/components/ProductHeader";
import React, {useEffect} from "react";
import axios from "axios";
import {Chart, initialData} from "@/app/components/ChartComponent";
import {AboutCompany} from "@/app/components/AboutCompany";
import {useRecoilState} from "recoil";
import {companyDataState} from "@/lib/recoilState";
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router";

export function Product() {

    const [companyData, setCompanyData] = useRecoilState(companyDataState);
    const { searchQuery } = useParams();

    useEffect(() => {
        if (searchQuery) {
            axios
                .get(
                    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=demo`//L7LNN00KVSBU9UPD
                )
                .then((res) => {
                    setCompanyData(res.data);
                });
        }
    },[setCompanyData]);

    if (companyData.Name === "") {
        return <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress/>
        </div>
    }

    return <div>
        <ProductHeader/>
        <Chart data={initialData}/>
        <AboutCompany/>
    </div>
}