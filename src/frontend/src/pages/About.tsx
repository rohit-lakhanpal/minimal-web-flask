import {ReactElement, FC} from "react";
import {Box, Container, Paper, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import { SharedState } from "../state/SharedState";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

interface AboutProps {
    sharedState: SharedState;
}

const About: FC<AboutProps> = ({sharedState}): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>            
           <Container maxWidth="xl">
                <Typography variant="h3">About</Typography>
                <Typography variant="subtitle1">
                This is a simple flask and react boilerplate app that can be extended.
                </Typography>
                <Item>
                - This app relies on backend apis published via `backend` project within this repo. 
                <br />
                - Please ensure that the project is running before attempting to use this app. 
                <br />
                - When running locally, requests to /api path are proxied to the backend project at http://127.0.0.1:5000/api/info.
                </Item>
            </Container>
        </Box>
    );
};

export default About;