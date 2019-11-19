import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import {Menu, Item, MenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        overflow: 'auto',
        flex: 'auto',
        flexDirection: 'column'
    }
}));

const Hash = ({hashType, content, compareString, id}) => {

    const classes = useStyles();
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);

    let compareColor = null;
    let compareIcon = null;
    if (compareString && compareString === content) {
        compareIcon = <CheckIcon color={"inherit"} style={{float: 'right'}}/>;
        compareColor = {color: 'green'};
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                    {hashType}{compareIcon}
                </Typography>
                <MenuProvider id={"hashMenu" + id}>
                    <span style={compareColor}>{content}</span>
                </MenuProvider>
                <Menu id={'hashMenu' + id}>
                    <Item onClick={() => navigator.clipboard.writeText(content)}>{language.copy}</Item>
                </Menu>
            </Paper>
        </>
    )
};

export default Hash;
