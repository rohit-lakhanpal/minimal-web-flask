import React, { useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./utilities/routes";
import theme from './utilities/theme';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { SharedState } from "./state/SharedState";
import { infoService } from "./services/infoService";

function App() {  
  const [appInfo, setAppInfo] = useState<any>({});
  
  useEffect(() => {
    (async () => {                          
        try{
            const about = await infoService.getAppInfoAsync();
            setAppInfo(about);
        }
        catch {
          setAppInfo({});
        }
    })();
  }, []);

  const sharedState: SharedState = {    
    appInfo 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar sharedState={sharedState} />
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={React.createElement(route.component, {sharedState})}
              />
            ))}
          </Routes>
          <Footer sharedState={sharedState} />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;