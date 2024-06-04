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
  const [errors, setErrors] = useState<any[]>([]);
  const [warnings, setWarnings] = useState<any[]>([]);
  const [info, setInfo] = useState<any[]>([]);
  const [appInfo, setAppInfo] = useState<any>({});

  const binErrors = (idx: number) => {
    // remove the warning at idx
    setErrors((prev:any) => {
        return prev.filter((e:any, i:number) => {
            return i !== idx;
        })
    });
  };
  const binWarnings = (idx: number) => {
    // remove the warning at idx
    setWarnings((prev:any) => {
        return prev.filter((e:any, i:number) => {
            return i !== idx;
        })
    });
  };
  const binInfo = (idx: number) => {
    // remove the warning at idx
    setInfo((prev:any) => {
        return prev.filter((e:any, i:number) => {
            return i !== idx;
        })
    });
  };
  
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
    errors,
    warnings,
    info,
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