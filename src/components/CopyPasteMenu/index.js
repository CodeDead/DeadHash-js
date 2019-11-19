import React from "react";
import {Item, Menu, MenuProvider} from "react-contexify";
import {useSelector} from "react-redux";

const CopyPasteMenu = ({id, children, copyData, pasteData}) => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);

    return (
        <>
            <MenuProvider id={"copyPasteMenu" + id} style={{width: "100%"}}>
                {children}
            </MenuProvider>
            <Menu id={'copyPasteMenu' + id}>
                <Item onClick={() => copyData()}>{language.copy}</Item>
                <Item onClick={() => pasteData()}>{language.paste}</Item>
            </Menu>
        </>
    );
};

export default CopyPasteMenu;
