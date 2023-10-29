import {Tab, Tabs, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import {Box} from "@mui/system";
import {GStockCard} from "@/app/components/GStockCard";
import {LStockCard} from "@/app/components/LStockCard";
import TradingViewWidget from "@/app/components/TradingViewWidget";

interface TopGainer {
    ticker: string;
    price: number;
    change_percentage: number;
    change_amount: number;
}

interface TopLoser {
    ticker: string;
    price: number;
    change_percentage: number;
    change_amount: number;
}

export function ShowTab({ topGainers, topLosers }: { topGainers: TopGainer[], topLosers: TopLoser[] }) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Top Gainers"></Tab>
                <Tab label="Top Losers"></Tab>
                <Tab label="Popular Charts"></Tab>
            </Tabs>
        </div>

        <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
                {topGainers.map((topGainer) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={topGainer.ticker}>
                        <GStockCard topGainer={topGainer}></GStockCard>
                    </Grid>
                ))}
            </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
                {topLosers.map((topLoser) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={topLoser.ticker}>
                        <LStockCard topLoser={topLoser}></LStockCard>
                    </Grid>
                ))}
            </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: 30
            }}>
                <TradingViewWidget/>
            </div>
        </TabPanel>
    </div>
}

function TabPanel(props: { children: React.ReactNode, value: number, index: number }) {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}