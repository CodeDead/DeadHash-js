import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import blank from "./blank.png";

const useStyles = makeStyles({
    media: {
        height: 60,
    },
});

const Theme = ({title, description, color, selected, onAction}) => {

    const classes = useStyles();
    const action = onAction ? onAction : null;

    return (
        <Card raised={!selected}>
            <CardActionArea onClick={action}>
                <CardMedia
                    className={classes.media}
                    title={title}
                    image={blank}
                    style={{backgroundColor: color}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default Theme;
