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

function App() {

    const themeIndex = useSelector(state => state.MainReducer.themeIndex);
    const color = ThemeSelector(themeIndex);

    const theme = createMuiTheme({
        palette: {
            primary: color,
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <Topbar/>
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
