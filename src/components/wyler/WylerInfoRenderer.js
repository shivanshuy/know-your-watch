/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import WylerInfoDecoder from './WylerInfoDecoder';
import WylerGeneralModelInfoRenderer from './WylerGeneralModelInfoRenderer';



export default function WylerInfoRenderer({model}) {
    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);
    const wylerInfoDecoder = new WylerInfoDecoder({model});
    

    useEffect(() => {
        setGeneralModelInfo(wylerInfoDecoder.getGeneralModelInfo());
      });

    return (
        <div>
            {generalModelInfo &&
                <Box p={1} m={1}>
                    <WylerGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></WylerGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
