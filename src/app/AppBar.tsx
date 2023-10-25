import { TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function AppBar() {
    return <div style={{
        minHeight: 60,
        backgroundColor: "darkorange",
        display: "flex",
        justifyContent: "space-around"
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <Typography variant={"h5"}>GrowwStonks</Typography>
        </div>

        <TextField
            label="Search stocks & ETFs"
            size="small"
            margin="dense"
            color="warning"
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </div>
}