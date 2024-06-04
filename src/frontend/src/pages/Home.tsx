import React, { ReactElement, FC, useEffect } from "react";
import { Box, Link, Typography, colors } from "@mui/material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { SharedState } from "../state/SharedState";


interface HomeProps {
    sharedState: SharedState;
}

const Home: FC<HomeProps> = ({ sharedState }): ReactElement => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");

    useEffect(() => {
        var defaultName = "App name ...";
        var defaultDescription = "App description ...";
        try {
            var r = sharedState.appInfo;
            setName(r?.name || defaultName);
            setDescription(r?.description || defaultDescription);
        } catch {
            setName(defaultName);
            setDescription(defaultDescription);
            console.error("Failed to get app info, using defaults.");
        }
    }, [sharedState.appInfo]);

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "2rem",
        }}>

            <Typography variant="h3" style={{ verticalAlign: 'middle', display: 'inline-flex' }} >
                <RecordVoiceOverIcon fontSize="inherit" />
                &nbsp;
                {name}
            </Typography>
            <Typography variant="h5" style={{ paddingTop: '2rem' }}>
                {description}
            </Typography>
            <Typography variant="h6" style={{ margin: '2rem' }}>
                This app relies on backend apis published via `backend` project within this repo.
                Please ensure that the project is running before attempting to use this app.
                Requests to <code style={{ color: colors.purple[500] }}>/api</code> path are proxied to the api
                project at {' '}<code><Link target="_blank" href="http://127.0.0.1:5000/api/info">http://127.0.0.1:5000/api/info</Link></code>.
            </Typography>
        </Box>
    );
};

export default Home;