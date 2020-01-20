import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const DropZone = ({children}) => {

    const history = useHistory();
    const enabled = useSelector(state => state.MainReducer.canDragDrop);
    const dispatch = useDispatch();

    /**
     * Event that is fired when one or more files are dropped
     * @param event The event that contains the drop details
     */
    const onDrop = (event) => {
        event.preventDefault();
        if (!enabled) return;

        dispatch({type: 'SET_CURRENT_FILE', payload: event.dataTransfer.files[0]});
        history.push("/file");
    };

    /**
     * Event that is fired when a drag over event is detected
     * @param event The event that contains the drag over details
     */
    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            onDragOver={onDragOver}
            onDrop={onDrop}>
            {children}
        </div>
    );

};

export default DropZone;
