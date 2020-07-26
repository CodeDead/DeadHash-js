import React from "react";
import {Item, Menu, MenuProvider} from "react-contexify";
import CopyIcon from "@material-ui/icons/FileCopy"
import PasteIcon from "@material-ui/icons/Assignment";

const CopyPasteMenu = ({id, children, copyData, pasteData, copy, paste}) => {

    return (
        <>
            <MenuProvider id={"copyPasteMenu" + id} style={{width: "100%"}}>
                {children}
            </MenuProvider>
            <Menu id={'copyPasteMenu' + id}>
                <Item onClick={() => copyData()}><CopyIcon/> {copy}</Item>
                <Item onClick={() => pasteData()}><PasteIcon/> {paste}</Item>
            </Menu>
        </>
    );
};

export default CopyPasteMenu;
