"use client";

import { TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {useState} from "react";

export function AppBar() {
    const [value, setValue] = useState("");

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
            <Typography variant={"h5"}>GrowwStonks</Typography>
        </div>

        <TextField
            label="Search stocks & ETFs"
            size="small"
            margin="dense"
            color="info"
            onChange={(e) => {
                setValue(e.target.value);
                axios.get(
                    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=demo"
                ).then((res) => {
                    console.log(res.data);
                    console.log(value)
                })
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </div>
}