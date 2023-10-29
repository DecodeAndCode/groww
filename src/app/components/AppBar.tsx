"use client";

import { TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import {useRecoilState} from "recoil";
import {companyDataState} from "@/lib/recoilState";

interface Match {
    "1. symbol": string;
}

export function AppBar() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [companyData, setCompanyData] = useRecoilState(companyDataState);

    // const handleSearch = (value) => {
    //     setSearchQuery(value);
    // };

    const handleSearchSubmit = () => {
        if (searchQuery) {
            axios
                .get(
                    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=L7LNN00KVSBU9UPD`
                )
                .then((res) => {
                    setCompanyData(res.data);
                    navigate('/product')
                });
        }
    };

    const handleSearch = (searchTerm: string) => {
        axios
            .get(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=L7LNN00KVSBU9UPD`
            )
            .then((res) => {
                const data = res.data.bestMatches || [];
                console.log(data);
                setOptions(data.map((match : Match) => match["1. symbol"]));
                if (data.length > 0) {
                    setSearchQuery(data[0]["1. symbol"]);
                }
            });
    };

    return <div style={{
        minHeight: 60,
        backgroundColor: "darkorange",
        display: "flex",
        justifyContent: "space-around"
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <Typography variant={"h5"} onClick={()=>{
                navigate("/")
            }}>GrowwStonks</Typography>
        </div>

        <Autocomplete
            options={options}
            onInputChange={(e, newInputValue) => {
                handleSearch(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search stocks & ETFs"
                    size="small"
                    margin="dense"
                    color="info"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handleSearchSubmit}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: "350px" }}
                />
            )}
        />
    </div>
}