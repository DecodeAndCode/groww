"use client";

import {Explore} from "@/app/Explore";
import {AppBar} from "@/app/AppBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Product} from "@/app/Product";

export default function Home() {
    return (
        <BrowserRouter>
            <AppBar/>
            <Product/>
            {/*<Abc/>*/}
            {/*<Routes>*/}
            {/*    <Route path="/" element={<Explore/>}/>*/}
            {/*    <Route path="/" element={<Product/>}/>*/}
            {/*</Routes>*/}
        </BrowserRouter>
)}
