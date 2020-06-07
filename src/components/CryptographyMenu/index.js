import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector} from "react-redux";
import KeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

const CryptographyMenu = ({handleIndexChange, selectedIndex}) => {

    const classes = useStyles();
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const [openCollapse, setOpenCollapse] = useState(true);

    /**
     * Open the menu
     */
    const handleOpenMenu = () => {
        setOpenCollapse(!openCollapse);
    };

    return (
        <List>
            <ListItem button selected={selectedIndex === 0}>
                <ListItemIcon onClick={() => handleIndexChange(0)}><KeyIcon/></ListItemIcon>
                <ListItemText onClick={() => handleIndexChange(0)} primary={language.cryptography}/>
                {openCollapse ? <ExpandLessIcon color="inherit" onClick={handleOpenMenu}/> :
                    <ExpandMoreIcon color="inherit" onClick={handleOpenMenu}/>}
            </ListItem>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem selected={selectedIndex === 1} button className={classes.nested}
                              onClick={() => handleIndexChange(1)}>
                        <ListItemText inset primary={language.file}/>
                    </ListItem>
                    <ListItem selected={selectedIndex === 2} button className={classes.nested}
                              onClick={() => handleIndexChange(2)}>
                        <ListItemText inset primary={language.text}/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default CryptographyMenu;
