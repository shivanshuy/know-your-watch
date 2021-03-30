/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import RaketaInfoDecoder from './RaketaInfoDecoder';
import RaketaGeneralModelInfoRenderer from './RaketaGeneralModelInfoRenderer';



export default function RaketaInfoRenderer({model}) {
    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);
    const wylerInfoDecoder = new RaketaInfoDecoder({model});
    

    useEffect(() => {
        setGeneralModelInfo(wylerInfoDecoder.getGeneralModelInfo());
      });

    return (
        <div>
            {generalModelInfo &&
                <Box p={1} m={1}>
                    <RaketaGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></RaketaGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
