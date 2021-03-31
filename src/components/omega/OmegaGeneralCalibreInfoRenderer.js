/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default function OmegaGeneralCalibreInfoRenderer({generalCalibreInfo}) {

    const StyledListItemIcon = withStyles({
        root: {
            minWidth: 30
        }
    })(ListItemIcon);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            //justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Box display="flex" flexDirection="column">
                <Box fontWeight="fontWeightBold">General Calibre Info</Box>
                <List dense={true}>
                    {generalCalibreInfo.info.map((genInfo) => (
                        <ListItem button disableGutters={true}>
                            <StyledListItemIcon>
                                <ArrowRightIcon />
                            </StyledListItemIcon>
                            {genInfo}
                        </ListItem>
                    ))}
                </List>
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {generalCalibreInfo.images.map((image) => (
                            <GridListTile key={image.img} cols={image.cols || 1}>
                                <img src={image.img} alt={image.title} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Box>
        </div>
    );
}
