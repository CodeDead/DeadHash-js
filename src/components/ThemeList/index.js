import React from "react";
import Grid from "@material-ui/core/Grid";

const ThemeList = ({spacing, children, xs, md, lg}) => {
    return (
        <Grid container spacing={spacing}>
            {children.map((e, i) => {
                return (
                    <Grid key={i} item xs={xs} md={md} lg={lg}>
                        {e}
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default ThemeList;
