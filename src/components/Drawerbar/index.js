import React from 'react';
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
import {useSelector, useDispatch} from "react-redux";
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from "@material-ui/icons/Build";
import HelpIcon from "@material-ui/icons/Help";
import KeyIcon from "@material-ui/icons/VpnKey";
import {useHistory} from "react-router-dom";
import CryptographyMenu from "../CryptographyMenu";

const drawerWidth = 220;
const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const Drawerbar = () => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const open = useSelector(state => state.MainReducer.drawerOpen);
    const selectedItem = useSelector(state => state.MainReducer.selectedListItem);

    const history = useHistory();

    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    /**
     * Function that is called when the drawer should close
     */
    function handleDrawerClose() {
        dispatch({type: "SET_DRAWEROPEN", drawerOpen: false});
    }

    /**
     * Handle a page change
     * @param index The index of the page
     */
    function handleIndexChange(index) {
        dispatch({type: "SET_DRAWEROPEN", drawerOpen: false});
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
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
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

            <CryptographyMenu handleIndexChange={handleIndexChange} selectedIndex={selectedItem} />

            <Divider/>

            <List>
                <ListItem onClick={() => handleIndexChange(3)} selected={selectedItem === 3} button>
                    <ListItemIcon><BuildIcon/></ListItemIcon>
                    <ListItemText primary={language.settings}/>
                </ListItem>
            </List>

            <Divider/>

            <List>
                <ListItem onClick={() => handleIndexChange(4)} button>
                    <ListItemIcon><HelpIcon/></ListItemIcon>
                    <ListItemText primary={language.help}/>
                </ListItem>

                <ListItem onClick={() => handleIndexChange(5)} selected={selectedItem === 5} button>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText primary={language.about}/>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Drawerbar;