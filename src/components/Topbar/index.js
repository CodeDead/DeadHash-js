import React, {useState} from "react";
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
import Drawerbar from "../Drawerbar";
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from "@material-ui/icons/Minimize";
import FullScreenIcon from "@material-ui/icons/Fullscreen";

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
    offset: {
        ...theme.mixins.toolbar,
        flexGrow: 1
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

const remote = window.require('electron').remote;

const Topbar = () => {

    const classes = useStyles();
    const open = useSelector(state => state.MainReducer.drawerOpen);
    const languageIndex = useSelector(state => state.MainReducer.languageIndex);
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const minimizeEnabled = useSelector(state => state.MainReducer.minimizeEnabled);
    const maximizeEnabled = useSelector(state => state.MainReducer.maximizeEnabled);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const languageOpen = Boolean(anchorEl);

    /**
     * Open the drawer
     */
    const openDrawer = () => {
        dispatch({type: "SET_DRAWEROPEN", drawerOpen: true});
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
        remote.getGlobal("mainWindow").minimize();
    };

    /**
     * Maximize or restore the previous state of the window
     */
    const maximize = () => {
        if (!remote.getGlobal("mainWindow").isMaximized()) {
            remote.getGlobal("mainWindow").maximize();
        } else {
            remote.getGlobal("mainWindow").unmaximize();
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={open ? classes.appBarShift + ' ' + classes.appBar : classes.appBar}>
                <Toolbar variant={"dense"}>
                    <IconButton edge="start" className={open ? classes.hide : null} color="inherit"
                                aria-label="menu" onClick={openDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{WebkitAppRegion: "drag"}}>
                        {language.appName}
                    </Typography>

                    <div>
                        <IconButton
                            aria-label="Account of current user"
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
                                      selected={languageIndex === 2}>Français</MenuItem>
                            <MenuItem onClick={() => changeLanguage(3)}
                                      selected={languageIndex === 3}>Italiano</MenuItem>
                            <MenuItem onClick={() => changeLanguage(4)}
                                      selected={languageIndex === 4}>日本語</MenuItem>
                            <MenuItem onClick={() => changeLanguage(5)}
                                      selected={languageIndex === 5}>Nederlands</MenuItem>
                            <MenuItem onClick={() => changeLanguage(6)}
                                      selected={languageIndex === 6}>Pусский</MenuItem>
                            <MenuItem onClick={() => changeLanguage(7)}
                                      selected={languageIndex === 7}>Türkçe</MenuItem>
                        </Menu>
                    </div>
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
                            <FullScreenIcon/>
                        </IconButton>
                        : null
                    }
                    <IconButton
                        color="inherit"
                        onClick={() => remote.getGlobal("mainWindow").close()}>
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
            <Drawerbar/>
        </div>
    );
};

export default Topbar;
