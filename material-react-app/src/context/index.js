/**
=========================================================
* GPT Toolkit React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo, useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// GPT Toolkit React main context
const MaterialUI = createContext();


// Create Context
export const MusicKitContext = createContext();
import GPTService from 'services/gpt-service';
// Create Provider
export const MusicKitProvider = ({ children }) => {
  
  const [music, setMusic] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof MusicKit !== 'undefined') {
        clearInterval(interval);
        const musicInstance = MusicKit.configure({
          developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjY3TDY2U05QTTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJVN1dLODZQTFlYIiwiaWF0IjoxNjg3Mjg2MTgxLCJleHAiOjE3MDE2ODYxODF9.bQ8nsMrBES7AI0o5RO29vCq-4m9SrwQrwQedtB6sqXXp6DP8akvQsoFXjAB4jrhAWGtj3nLeZiL6XElvd3FEBg',
          app: {
              name: 'My Cool Web App',
              build: '1978.4.1',
          },
        }).then(musicInstance => {
          setMusic(musicInstance);
        }).catch(error => {
          console.error('Error configuring MusicKit:', error);
        });
      }
    }, 100); // Check every 100 ms
  }, []);

  return (
    <MusicKitContext.Provider value={music}>
      {children}
    </MusicKitContext.Provider>
  );
};

export const WPSiteURLContext=createContext();
export const WPSiteURLProvider = ({ children }) => {
  const [WPSiteURL, setWPSiteURL] = useState("");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

   useEffect(() => {
    const fetchWPSiteURL = async () => {
      try {
        const response = await GPTService.fetchWPSiteUrl();
        console.log(response);
        if (response) {
          setWPSiteURL(response.WPSiteURL);
        }
      } catch (error) {
        console.error(error);
        // Handle your error properly
      }
    };

    fetchWPSiteURL();
  }, [isAuthenticated]);
  return (
    <WPSiteURLContext.Provider value={{ WPSiteURL, setWPSiteURL }}>
      {children}
    </WPSiteURLContext.Provider>
  );
};
export const ApiUsageContext=createContext();
export const ApiUsageProvider = ({ children }) => {
  const [apiUsage, setApiUsage] = useState(0);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

   useEffect(() => {
    const fetchAPIUsage = async () => {
      try {
        const response = await GPTService.fetchAPIUse();
        console.log(response);
        if (response) {
          setApiUsage(response.apiUsage);
        }
      } catch (error) {
        console.error(error);
        // Handle your error properly
      }
    };
if(isAuthenticated){
    fetchAPIUsage();
}
  }, [isAuthenticated]);
  return (
    <ApiUsageContext.Provider value={{ apiUsage, setApiUsage }}>
      {children}
    </ApiUsageContext.Provider>
  );
};
// authentication context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {


  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("user");
      if(storedUser) {
        setUser(JSON.parse(storedUser)); // Parse the stringified user object
      }
    }  
    if (isAuthenticated && (location.pathname === "/auth/login" || location.pathname === "/auth/register")) {
      navigate("/dashboard");
    } else if (!isAuthenticated && location.pathname !== "/auth/register" && location.pathname !== "/auth/forgot-password") {
      navigate("/auth/login");
    } else {
      navigate(location.pathname);
    }
  }, [isAuthenticated, location.pathname, navigate,setUser]);

  const login = (token,user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// GPT Toolkit React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// GPT Toolkit React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// GPT Toolkit React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  AuthContextProvider,
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
