import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../../routes/Home";
import Settings from "../../routes/Settings";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import {ThemeSelector} from "../../utils/ThemeSelector";
import Topbar from "../Topbar";
import About from "../../routes/About";
import File from "../../routes/File";
import Text from "../../routes/Text";
import Drawerbar from "../Drawerbar";
import {CssBaseline} from "@material-ui/core";

function App() {

    let themeIndex = useSelector(state => state.MainReducer.themeIndex);
    let themeType = "light";
    if (themeIndex === 8) {
        themeType = "dark";
        themeIndex = 2;
    }
    const color = ThemeSelector(themeIndex);

    const theme = createMuiTheme({
        palette: {
            primary: color,
            type: themeType
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <Topbar/>
                    <Drawerbar/>
                    <CssBaseline/>
                    <Switch>
                        <Route path={"/settings"}>
                            <Settings/>
                        </Route>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/file">
                            <File/>
                        </Route>
                        <Route path="/text">
                            <Text/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
