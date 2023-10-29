"use client";

import {Explore} from "@/app/pages/Explore";
import {AppBar} from "@/app/components/AppBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Product} from "@/app/pages/Product";
import {RecoilRoot} from "recoil";

export default function Home() {

    const isClient = typeof window !== "undefined";

    return (
        isClient ? (
            <RecoilRoot>
                <Router>
                        <AppBar/>
                        <Routes>
                            <Route path="/" element={<Explore/>}/>
                            <Route path="/product" element={<Product/>}/>
                        </Routes>
                </Router>
            </RecoilRoot>
        ) : null
    );
}
