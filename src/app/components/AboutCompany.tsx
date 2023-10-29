import {Typography} from "@mui/material";
import React from "react";
import {useRecoilValue} from 'recoil';
import { companyDataState } from '@/lib/recoilState';

export function AboutCompany() {

    const companyData = useRecoilValue(companyDataState);

    return (
        <div className="about-company">
            <div style={{padding: 10}}>
                <Typography variant={"h6"}>{"About " + companyData.Name}</Typography>
            </div>
            <hr color={"solid white 5px"}/>
            <div style={{padding: 10}}>
                {companyData.Description}
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
                    padding: 20
                }}>
                    {"INDUSTRY: " + companyData.Industry}
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
                    {"SECTOR: " + companyData.Sector}
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
                        {"$" + companyData.WeekLow}
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
                        {"Current price: $" + companyData.AnalystTargetPrice}
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
                        {"$" + companyData.WeekHigh}
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
                        {"$" + companyData.MarketCapitalization / 1000000000 + "T"}
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
                        {companyData.PERatio}
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
                        {companyData.Beta}
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
                        {companyData.DividendYield + "%"}
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
                        {companyData.ProfitMargin}
                    </div>
                </div>
            </div>
        </div>
    )
}