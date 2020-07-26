import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from "@material-ui/icons/Build";
import HelpIcon from "@material-ui/icons/Help";
import CloseIcon from "@material-ui/icons/Close";
import {useHistory} from "react-router-dom";
import CryptographyMenu from "../CryptographyMenu";
import {MainContext} from "../../contexts/MainContextProvider";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

const ipcRenderer = window.require('electron').ipcRenderer;

const Drawerbar = ({open, onClose}) => {

    const [state] = useContext(MainContext);
    const language = state.languages[state.languageIndex];
    const selectedItem = state.selectedListItem;

    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    /**
     * Function that is called when the drawer should close
     */
    const handleDrawerClose = () => {
        onClose();
    };

    /**
     * Handle a page change
     * @param index The index of the page
     */
    const handleIndexChange = (index) => {
        onClose();
        if (selectedItem === index) return;

        switch (index) {
            default:
            case 0:
                history.push('/');
                break;
            case 1:
                history.push('/file');
                break;
            case 2:
                history.push('/text');
                break;
            case 3:
                history.push('/settings');
                break;
            case 4:
                window.open("https://codedead.com/Software/DeadHash/help.pdf", "_blank");
                break;
            case 5:
                history.push('/about');
                break;
        }
    };

    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            open={open}
            onClose={handleDrawerClose}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>

            <Divider/>

            <CryptographyMenu handleIndexChange={handleIndexChange} selectedIndex={selectedItem}
                              cryptography={language.cryptography} file={language.file} text={language.text}/>

            <Divider/>

            <List>
                <ListItem onClick={() => handleIndexChange(3)} selected={selectedItem === 3} button>
                    <ListItemIcon><BuildIcon color="inherit"/></ListItemIcon>
                    <ListItemText primary={language.settings}/>
                </ListItem>
            </List>

            <Divider/>

            <List>
                <ListItem onClick={() => handleIndexChange(4)} button>
                    <ListItemIcon><HelpIcon color="inherit"/></ListItemIcon>
                    <ListItemText primary={language.help}/>
                </ListItem>

                <ListItem onClick={() => handleIndexChange(5)} selected={selectedItem === 5} button>
                    <ListItemIcon><InfoIcon color="inherit"/></ListItemIcon>
                    <ListItemText primary={language.about}/>
                </ListItem>
            </List>

            <Divider/>

            <List>
                <ListItem onClick={() => ipcRenderer.send('handle-close')} button>
                    <ListItemIcon><CloseIcon color="inherit"/></ListItemIcon>
                    <ListItemText primary={language.exit}/>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Drawerbar;
