import {Typography} from "@mui/material";
import React from "react";

interface AboutCompanyProps {
    Name: string;
    Description: string;
    Industry: string;
    Sector: string;
    Beta: number;
    ProfitMargin: number;
    WeekLow: number;
    WeekHigh: number;
    PERatio: number;
    DividendYield: number;
    MarketCapitalization: number;
    AnalystTargetPrice: number;
}

export function AboutCompany({
                                 Name,
                                 Description,
                                 Industry,
                                 Sector,
                                 Beta,
                                 ProfitMargin,
                                 WeekLow,
                                 WeekHigh,
                                 PERatio,
                                 DividendYield,
                                 MarketCapitalization,
                                 AnalystTargetPrice
                             }: AboutCompanyProps) {
    return (
        <div style={{
            border: "solid dimgray 1px",
            borderRadius: "10px",
            marginLeft: 255,
            marginRight: 255,
            marginTop: 30,
            overflow: 'hidden',
            marginBottom: 30
        }}>
            <div style={{padding: 10}}>
                <Typography variant={"h6"}>{"About " + Name}</Typography>
            </div>
            <hr color={"solid dimgray 5px"}/>
            <div style={{padding: 10}}>
                {Description}
            </div>
            <div style={{
                padding: 10,
                justifyContent: "space-around",
                display: "flex"
            }}>
                <div style={{
                    width: 300,
                    height: 50,
                    backgroundColor: "darkorange",
                    borderRadius: 25,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10
                }}>
                    {"Industry: " + Industry}
                </div>
                <div style={{
                    width: 300,
                    height: 50,
                    backgroundColor: "darkorange",
                    borderRadius: 25,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10
                }}>
                    {"Sector: " + Sector}
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: 20
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"52-WEEK LOW"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {"$" + WeekLow}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        {"Current price: $" + AnalystTargetPrice}
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>&#x25BC;</div>
                    <div style={{
                        minWidth: 300,
                        border: "solid gray 1px"
                    }}>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"52-WEEK HIGH"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {"$" + WeekHigh}
                    </div>
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: 20
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"Market Cap"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {"$" + MarketCapitalization / 1000000000 + "T"}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"P/E Ratio"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {PERatio}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"Beta"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {Beta}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"Dividend Yield"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {DividendYield + "%"}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>{"Profit Margin"}</div>
                    <div style={{
                        fontWeight: "bold"
                    }}>
                        {ProfitMargin}
                    </div>
                </div>
            </div>
        </div>
    )
}