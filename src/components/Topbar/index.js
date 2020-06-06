import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useSelector, useDispatch} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from "@material-ui/icons/Minimize";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import Drawerbar from "../Drawerbar";

const drawerWidth = 220;
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    hide: {
        display: 'none'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const ipcRenderer = window.require('electron').ipcRenderer;

const Topbar = () => {

    const classes = useStyles();
    const languageIndex = useSelector(state => state.MainReducer.languageIndex);
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const minimizeEnabled = useSelector(state => state.MainReducer.minimizeEnabled);
    const maximizeEnabled = useSelector(state => state.MainReducer.maximizeEnabled);
    const languageEnabled = useSelector(state => state.MainReducer.languageEnabled);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const languageOpen = Boolean(anchorEl);

    const fullScreenEvent = () => {
        setFullScreen(true);
    }

    const exitFullScreenEvent = () => {
        setFullScreen(false);
    }

    useEffect(() => {
        ipcRenderer.on("window-maximized", fullScreenEvent);
        ipcRenderer.on("window-unmaximized", exitFullScreenEvent);
    }, []);

    /**
     * Open the drawer
     */
    const openDrawer = () => {
        setDrawerOpen(true);
    };

    /**
     * Change the language of the application
     * @param lang The language index
     */
    const changeLanguage = (lang) => {
        handleClose();
        dispatch({type: 'SET_LANGUAGEINDEX', index: lang});
    };

    /**
     * Handle the closing of the top bar
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Handle menu event
     * @param event The event of the menu
     */
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Minimize the window
     */
    const minimize = () => {
        ipcRenderer.send('handle-minimize');
    };

    /**
     * Maximize or restore the previous state of the window
     */
    const maximize = () => {
        ipcRenderer.send('handle-maximize');
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color={"primary"}
                    className={drawerOpen ? classes.appBarShift + ' ' + classes.appBar : classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={drawerOpen ? classes.hide : null} color="inherit"
                                aria-label="menu" onClick={openDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{WebkitAppRegion: "drag"}}>
                        {language.appName}
                    </Typography>

                    {languageEnabled ?
                        <div>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <LanguageIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={languageOpen}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={() => changeLanguage(0)}
                                          selected={languageIndex === 0}>Deutsch</MenuItem>
                                <MenuItem onClick={() => changeLanguage(1)}
                                          selected={languageIndex === 1}>English</MenuItem>
                                <MenuItem onClick={() => changeLanguage(2)}
                                          selected={languageIndex === 2}>Español</MenuItem>
                                <MenuItem onClick={() => changeLanguage(3)}
                                          selected={languageIndex === 3}>Français</MenuItem>
                                <MenuItem onClick={() => changeLanguage(4)}
                                          selected={languageIndex === 4}>Italiano</MenuItem>
                                <MenuItem onClick={() => changeLanguage(5)}
                                          selected={languageIndex === 5}>日本語</MenuItem>
                                <MenuItem onClick={() => changeLanguage(6)}
                                          selected={languageIndex === 6}>Nederlands</MenuItem>
                                <MenuItem onClick={() => changeLanguage(7)}
                                          selected={languageIndex === 7}>Pусский</MenuItem>
                                <MenuItem onClick={() => changeLanguage(8)}
                                          selected={languageIndex === 8}>Türkçe</MenuItem>
                            </Menu>
                        </div>
                        : null}
                    {minimizeEnabled ?
                        <IconButton
                            color="inherit"
                            onClick={() => minimize()}>
                            <MinimizeIcon/>
                        </IconButton>
                        : null
                    }
                    {maximizeEnabled ?
                        <IconButton
                            color="inherit"
                            onClick={() => maximize()}>
                            {fullScreen ? <FullscreenExitIcon/> : <FullScreenIcon/>}
                        </IconButton>
                        : null
                    }
                    <IconButton
                        color="inherit"
                        onClick={() => ipcRenderer.send('handle-close')}>
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawerbar open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
            <Toolbar/>
        </div>
    );
};

export default Topbar;
