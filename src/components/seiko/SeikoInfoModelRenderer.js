/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import SeikoInfoModel from './SeikoInfoModel';

export default function SeikoInfoModelRenderer({seikoInfoModel}) {
    //const [value, setValue] = React.useState(options[0]);
    //const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
             <Box fontWeight="fontWeightBold" >{SeikoInfoModel.infoTypeLabels.get(seikoInfoModel.infoType)}</Box>
            <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
                {seikoInfoModel.manufacturingYearsLst && <Box display="flex" flexDirection="row">
                    <Box fontWeight="fontWeightBold" >{SeikoInfoModel.manufacturingYearsLstLabel}</Box>
                    <Box>{seikoInfoModel.manufacturingYearsLst.join(",")}</Box>
                </Box>}
                {seikoInfoModel.manufacturingYearsRangeLst && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1} fontWeight="fontWeightBold" >{SeikoInfoModel.manufacturingYearsLstLabel}</Box>
                    <Box mt={1} mb={1} >{seikoInfoModel.manufacturingYearsRangeLst.join("-")}</Box>
                </Box>}
                {seikoInfoModel.manufacturingMonth && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1} fontWeight="fontWeightBold" >{SeikoInfoModel.manufacturingMonthLabel}</Box>
                    <Box mt={1} mb={1} >{seikoInfoModel.manufacturingMonth}</Box>
                </Box>}
                {seikoInfoModel.caseBackCalibre && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1} fontWeight="fontWeightBold" >{SeikoInfoModel.caseBackCalibreLabel}</Box>
                    <Box mt={1} mb={1} >{seikoInfoModel.caseBackCalibre}</Box>
                </Box>}
                {seikoInfoModel.movement && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1}fontWeight="fontWeightBold" >{SeikoInfoModel.movementLabel}</Box>
                    <Box mt={1} mb={1}>{seikoInfoModel.movement}</Box>
                </Box>}
                {seikoInfoModel.movementType && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1}fontWeight="fontWeightBold" >{SeikoInfoModel.movementTypeLabel}</Box>
                    <Box mt={1} mb={1}>{seikoInfoModel.movementType}</Box>
                </Box>}
                {seikoInfoModel.waterResistanceMarkInfo && <Box display="flex" flexDirection="row">
                    <Box mt={1} mb={1}fontWeight="fontWeightBold" >{SeikoInfoModel.waterResistanceMarkLabel}</Box>
                    <Box mt={1} mb={1}>{seikoInfoModel.waterResistanceMarkInfo}</Box>
                </Box>}
            </Box>
        </div>
    );
}
