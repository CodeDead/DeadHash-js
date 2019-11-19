import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import blank from "./blank.png";

const useStyles = makeStyles({
    media: {
        height: 80,
    },
});

const Theme = ({title, description, color, selected, actionText, onAction}) => {

    const classes = useStyles();
    const variant = selected ? "contained" : "text";
    const action = onAction ? onAction : null;

    return (
        <Card>
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
            <CardActions>
                <Button size="small" color="primary" variant={variant} disabled={selected} onClick={action}>
                    {actionText}
                </Button>
            </CardActions>
        </Card>
    )
};

export default Theme;
