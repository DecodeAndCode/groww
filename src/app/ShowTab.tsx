import {Tab, Tabs, Grid, Typography, CircularProgress, Card} from "@mui/material";
import React, {useState} from "react";
import {Box} from "@mui/system";
import {GStockCard} from "@/app/GStockCard";
import {LStockCard} from "@/app/LStockCard";

export function ShowTab({topGainers, topLosers}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
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
            </Tabs>
        </div>

        <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
                {topGainers.map((topGainer) => (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <GStockCard topGainer={topGainer}></GStockCard>
                    </Grid>
                ))}
            </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
                {topLosers.map((topLoser) => (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <LStockCard topLoser={topLoser}></LStockCard>
                    </Grid>
                ))}
            </Grid>
        </TabPanel>
    </div>
}

function TabPanel(props) {
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