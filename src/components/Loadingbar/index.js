import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const Loadingbar = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    );
};

export default Loadingbar;
