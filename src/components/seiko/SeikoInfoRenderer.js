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

const allModelOptions = [
    {id: 'LM', name: "LM", brandId: "SEIKO"},
    {id: 'BELLMATIC', name: "Bellmatic", brandId: "SEIKO"},
    {id: 'SQ', name: "SQ (Seiko Quartz)", brandId: "SEIKO"},
    {id: 'ADVAN', name: "Advan", brandId: "SEIKO"},
];
const dummyModelOption = {id: 'DUMMY', name: "Model Name", brandId: "DUMMY"};

allModelOptions.unshift(dummyModelOption);
export default function SeikoInfoRenderer() {

    const [modelValue, setModelValue] = React.useState(allModelOptions[0]);
    const [modelOptions, setmodelOptions] = React.useState([]);
    const [modelInputValue, setModelInputValue] = React.useState('');

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
            model: modelValue.id,
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
            <Box display="flex" flexDirection="column" mt={2}>
                <Box mt={1} mb={1}>
                    <Autocomplete
                        value={modelValue}
                        onChange={(event, newValue) => {
                            setModelValue(newValue);
                        }}
                        inputValue={modelInputValue}
                        onInputChange={(event, newInputValue) => {
                            setModelInputValue(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={allModelOptions}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Model Name" variant="outlined" />}
                    />
                </Box>
                <Box mt={1} mb={1} display="flex" flexDirection="row">
                    <Box mr={1} mt={1} fontWeight="fontWeightBold" >Serial Number</Box>
                    <TextField
                        id="standard-basic"
                        label="Serial"
                        variant="outlined"
                        value={serialValue}
                        onChange={(event) => {
                            setSerialValue(event.target.value);
                        }} />
                </Box>
                <Box mt={1} mb={1} display="flex" flexDirection="row">
                    <Box mr={1} mt={1} fontWeight="fontWeightBold" >Model Reference</Box>
                    <TextField
                        id="standard-basic"
                        label="calibre - case code"
                        variant="outlined"
                        value={modelReferenceValue}
                        onChange={(event) => {
                            setModelReferenceValue(event.target.value);
                        }} />
                </Box>
                <Box mt={1} mb={1} display="flex" flexDirection="row">
                    <Box mr={1} mt={1} fontWeight="fontWeightBold" >Movement</Box>
                    <TextField
                        id="standard-basic"
                        label="Movement"
                        variant="outlined"
                        value={movementValue}
                        onChange={(event) => {
                            setmovementValue(event.target.value);
                        }} />
                </Box>
                <Box mt={1} mb={1} display="flex" flexDirection="row">
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
                <Box mt={1} mb={1} display="flex" flexDirection="row" bgcolor="background.paper">
                    <Button variant="contained" color="primary" onClick={() => {
                        decodeWatchInfo();
                    }}
                    >Get Info
                    </Button>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" mt={1}>
                {comparisionInfoLst && comparisionInfoLst.length > 0 &&
                    <Box mt={2}>
                        <SeikoInfoTableRenderer watchInfoLst={comparisionInfoLst}></SeikoInfoTableRenderer>
                    </Box>
                }
                {generalModelRefInfo &&
                    <Box mt={2}>
                        <SeikoGeneralModelRefInfoRenderer generalModelRefInfo={generalModelRefInfo}></SeikoGeneralModelRefInfoRenderer>
                    </Box>
                }
                {generalModelInfo &&
                    <Box mt={2}>
                        <SeikoGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></SeikoGeneralModelInfoRenderer>
                    </Box>
                }
            </Box>
        </div>
    );
}
