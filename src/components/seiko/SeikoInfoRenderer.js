/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
//import SeikoInfoModelRenderer from './SeikoInfoModelRenderer';
import SeikoInfoDecoder from './SeikoInfoDecoder'
import SeikoGeneralModelRefInfoRenderer from './SeikoGeneralModelRefInfoRenderer';
import SeikoGeneralModelInfoRenderer from './SeikoGeneralModelInfoRenderer';
import SeikoInfoTableRenderer from './SeikoInfoTableRenderer';

const waterResistOptions = [
    {id: 'WATERPROOF', name: "Water Proof"},
    {id: 'WATERRESIST', name: "Water Resist"}
];


export default function SeikoInfoRenderer({model}) {
    const [serialValue, setSerialValue] = React.useState("");
    const [modelReferenceValue, setModelReferenceValue] = React.useState("");
    const [movementValue, setmovementValue] = React.useState("");
    const [waterResistValue, setWaterResistValue] = React.useState("");
    const [waterResistInputValue, setWaterResistInputValue] = React.useState("");
    const [comparisionInfoLst, setComparisionInfoLst] = React.useState(null);
    const [generalModelRefInfo, setGeneralModelRefInfo] = React.useState(null);
    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);

    let seikoInfoDecoder;

    let decodeWatchInfo = () => {
        const seikoInfoDecoder = new SeikoInfoDecoder({
            serialNum: serialValue,
            modelReference: modelReferenceValue,
            model: model,
            movement: movementValue,
            waterResist: waterResistValue.id
        });
        
        const decodedSerialNumberInfo = seikoInfoDecoder.getDecodedSerialNumberInfo();
        const decodedModelReferenceInfo = seikoInfoDecoder.getDecodedModelReferenceInfo();
        const decodedMovementInfo = seikoInfoDecoder.getDecodedMovementInfo();
        const decodedWaterReststanceMarkInfo = seikoInfoDecoder.getDecodedWaterReststanceMarkInfo();
        const decodedModelInfo = seikoInfoDecoder.getDecodedModelInfo();

        let watchInfoArr = [];
        if (decodedSerialNumberInfo) {
            watchInfoArr.push(decodedSerialNumberInfo);
        }

        if (decodedModelReferenceInfo && decodedModelReferenceInfo.length > 0) {
            watchInfoArr = watchInfoArr.concat(decodedModelReferenceInfo);
        }

        if (decodedMovementInfo) {
            watchInfoArr.push(decodedMovementInfo);
        }

        if (decodedWaterReststanceMarkInfo) {
            watchInfoArr.push(decodedWaterReststanceMarkInfo);
        }

        if (decodedModelInfo) {
            watchInfoArr.push(decodedModelInfo);
        }

        setComparisionInfoLst(watchInfoArr);
        setGeneralModelRefInfo(seikoInfoDecoder.getGeneralModelRefInfo());
        setGeneralModelInfo(seikoInfoDecoder.getGeneralModelInfo());
    }

    return (
        <div>
            <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={1} m={1}>

                <Box m={1} display="flex" flexDirection="row">
                    <Box m={1} fontWeight="fontWeightBold" >Serial Number</Box>
                    <TextField
                        id="standard-basic"
                        label="Serial"
                        variant="outlined"
                        value={serialValue}
                        onChange={(event) => {
                            setSerialValue(event.target.value);
                        }} />
                </Box>
                <Box m={1} display="flex" flexDirection="row">
                    <Box m={1} fontWeight="fontWeightBold" >Model Reference</Box>
                    <TextField
                        id="standard-basic"
                        label="calibre - case code"
                        variant="outlined"
                        value={modelReferenceValue}
                        onChange={(event) => {
                            setModelReferenceValue(event.target.value);
                        }} />
                </Box>
                <Box m={1} display="flex" flexDirection="row">
                    <Box m={1} fontWeight="fontWeightBold" >Movement</Box>
                    <TextField
                        id="standard-basic"
                        label="Movement"
                        variant="outlined"
                        value={movementValue}
                        onChange={(event) => {
                            setmovementValue(event.target.value);
                        }} />
                </Box>
                <Box m={1} display="flex" flexDirection="row">
                    <Autocomplete
                        value={waterResistValue}
                        onChange={(event, newValue) => {
                            setWaterResistValue(newValue);
                        }}
                        inputValue={waterResistInputValue}
                        onInputChange={(event, newInputValue) => {
                            setWaterResistInputValue(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={waterResistOptions}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Water Resist Mark" variant="outlined" />}
                    />
                </Box>
                <Box m={1} display="flex" flexDirection="row" bgcolor="background.paper">
                    <Button variant="contained" color="primary" onClick={() => {
                        decodeWatchInfo();
                    }}
                    >Get Info
                    </Button>
                </Box>
            </Box>

            {comparisionInfoLst && comparisionInfoLst.length > 0 &&
                <Box p={1} m={1}>
                    <SeikoInfoTableRenderer watchInfoLst={comparisionInfoLst}></SeikoInfoTableRenderer>
                </Box>
            }
            {generalModelRefInfo &&
                <Box p={1} m={1}>
                    <SeikoGeneralModelRefInfoRenderer generalModelRefInfo={generalModelRefInfo}></SeikoGeneralModelRefInfoRenderer>
                </Box>
            }
            {generalModelInfo &&
                <Box p={1} m={1}>
                    <SeikoGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></SeikoGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
