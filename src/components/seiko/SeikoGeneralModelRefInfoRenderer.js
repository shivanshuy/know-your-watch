/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export default function SeikoGeneralModelRefInfoRenderer({generalModelRefInfo}) {

    return (
        <div>
            <Box fontWeight="fontWeightBold">General Model Reference Info</Box>
            <List dense={true}>
                {generalModelRefInfo.map((genInfo) => (
                    <ListItem button>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        {genInfo}
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
