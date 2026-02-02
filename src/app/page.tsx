"use client";

import { Explore } from "@/app/pages/Explore";
import { AppBar } from "@/app/components/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product } from "@/app/pages/Product";
import { RecoilRoot } from "recoil";
import { useState, useEffect } from "react";

export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <RecoilRoot>
            <Router>
                <div className="min-h-screen bg-gray-50 font-sans">
                    <AppBar />
                    <Routes>
                        <Route path="/" element={<Explore />} />
                        <Route path="/product/:searchQuery?" element={<Product />} />
                    </Routes>
                </div>
            </Router>
        </RecoilRoot>
    );
}
