import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const ImgMediaCard = ({image}) => {
    console.log("card image", image)
    const classes = useStyles();

    const deleteImage = (event) => {
        this.props.parentCallback("Data from child");
    }

    return (
        <Box my={2}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={image.image_path}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Grid   container
                                direction="row"
                                justify="space-between"
                                alignItems="center">
                            <Typography gutterBottom variant="h5" component="h2">
                                {image.image_text}
                            </Typography>
                            <DeleteIcon />
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
