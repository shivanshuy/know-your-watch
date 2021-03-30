/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import OmegaInfoDecoder from './OmegaInfoDecoder';
import OmegaGeneralModelInfoRenderer from './OmegaGeneralModelInfoRenderer';



export default function OmegaInfoRenderer({model}) {
    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);
    const omegaInfoDecoder = new OmegaInfoDecoder({model});
    

    useEffect(() => {
        setGeneralModelInfo(omegaInfoDecoder.getGeneralModelInfo());
      });

    return (
        <div>
            {generalModelInfo &&
                <Box p={1} m={1}>
                    <OmegaGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></OmegaGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
