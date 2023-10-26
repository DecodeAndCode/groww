"use client";

import {Explore} from "@/app/Explore";
import {AppBar} from "@/app/AppBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Product} from "@/app/Product";

export default function Home() {
    return (
        <BrowserRouter>
            <AppBar/>
            <Routes>
                <Route path="/" element={<Explore/>}/>
                <Route path="/product" element={<Product/>}/>
            </Routes>
        </BrowserRouter>
)}
