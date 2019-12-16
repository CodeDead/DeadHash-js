import React from "react";
import {Item, Menu, MenuProvider} from "react-contexify";
import {useSelector} from "react-redux";
import CopyIcon from "@material-ui/icons/FileCopy"
import PasteIcon from "@material-ui/icons/Assignment";

const CopyPasteMenu = ({id, children, copyData, pasteData}) => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);

    return (
        <>
            <MenuProvider id={"copyPasteMenu" + id} style={{width: "100%"}}>
                {children}
            </MenuProvider>
            <Menu id={'copyPasteMenu' + id}>
                <Item onClick={() => copyData()}><CopyIcon/> {language.copy}</Item>
                <Item onClick={() => pasteData()}><PasteIcon/> {language.paste}</Item>
            </Menu>
        </>
    );
};

export default CopyPasteMenu;
