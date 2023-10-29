"use client";

import {Explore} from "@/app/Explore";
import {AppBar} from "@/app/AppBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Product} from "@/app/Product";
// import TradingViewWidget from "@/app/TradingViewWidget";

export default function Home() {

    const isClient = typeof window !== "undefined";

    return (
        isClient ? (
            <Router>
                <AppBar />
                <Explore />
                <Routes>
                    <Route path="/product" element={<Product />} />
                </Routes>
                {/*<TradingViewWidget/>*/}
            </Router>
        ) : null
    );
}
