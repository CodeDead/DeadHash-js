import React from "react";
import Button from "@material-ui/core/Button";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import {useHistory} from "react-router";

const BackButton = () => {

    const history = useHistory();

    return (
        <Button variant={"inline"} color={"primary"} onClick={() => history.goBack()}>
            <ArrowLeftIcon />
        </Button>
    );
};

export default BackButton;
