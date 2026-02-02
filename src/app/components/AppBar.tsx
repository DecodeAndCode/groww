"use client";

import { TextField, Typography, InputAdornment, IconButton, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link"; // Not used but cleanup
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { companyDataState } from "@/lib/recoilState";
import { useDebounce } from "@/hooks/useDebounce";
import { searchTicker } from "@/lib/api";



export function AppBar() {
    const navigate = useNavigate();
    const [options, setOptions] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [companyData, setCompanyData] = useRecoilState(companyDataState);

    // Debounce the search query to prevent excessive API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            const fetchSymbols = async () => {
                try {
                    // Use new API helper
                    const results = await searchTicker(debouncedSearchQuery);
                    setOptions(results.map((match) => match.ticker));
                } catch (error) {
                    console.error("Error fetching symbols:", error);
                }
            };
            fetchSymbols();
        } else {
            setOptions([]);
        }
    }, [debouncedSearchQuery]);

    const handleSearchSubmit = (symbol: string) => {
        if (symbol) {
            // Navigate to product page with the selected symbol
            // The product page will handle fetching details
            navigate(`/product/${symbol}`);
        }
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-100">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <div className="bg-emerald-500 rounded-lg p-2 mr-3">
                    <Typography variant="h6" className="text-white font-bold tracking-tight">GM</Typography>
                </div>
                <Typography
                    variant="h5"
                    className="text-gray-900 font-bold tracking-tight hover:text-emerald-600 transition-colors"
                >
                    Groww Markets
                </Typography>
            </div>

            <div className="w-96 relative">
                <Autocomplete
                    freeSolo
                    options={options}
                    inputValue={searchQuery}
                    onInputChange={(event, newInputValue) => {
                        setSearchQuery(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            handleSearchSubmit(newValue);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            // Only navigate if the current query matches one of the options (case-insensitive)
                            // or if it looks like a valid ticker (e.g. 1-5 chars)
                            // But usually best to force selection. Here let's try to match options.
                            const exactMatch = options.find(opt => opt.toLowerCase() === searchQuery.toLowerCase());
                            if (exactMatch) {
                                handleSearchSubmit(exactMatch);
                                event.preventDefault();
                            }
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search stocks & ETFs (e.g., AAPL)"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="text-gray-400" />
                                    </InputAdornment>
                                ),
                                className: "bg-gray-50 rounded-full hover:bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white border-none"
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'transparent' },
                                    '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                },
                            }}
                        />
                    )}
                />
            </div>
        </nav>
    );
}