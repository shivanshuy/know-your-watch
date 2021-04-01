/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import OmegaInfoDecoder from './OmegaInfoDecoder';
import OmegaGeneralModelInfoRenderer from './OmegaGeneralModelInfoRenderer';
import OmegaGeneralCalibreInfoRenderer from './OmegaGeneralCalibreInfoRenderer';

const allModelOptions = [
    {id: 'LM', name: "LM", brandId: "SEIKO"},
    {id: 'BELLMATIC', name: "Bellmatic", brandId: "SEIKO"},
    {id: 'SQ', name: "SQ (Seiko Quartz)", brandId: "SEIKO"},
    {id: 'ADVAN', name: "Advan", brandId: "SEIKO"},
    {id: 'INCAFLEX', name: "Incaflex", brandId: "WYLER"},
    {id: 'BIGZERO', name: "Big Zero", brandId: "RAKETA"},
    {id: 'KOPERNIK', name: "Kopernik", brandId: "RAKETA"}
];
const dummyModelOption = {id: 'DUMMY', name: "Model Name", brandId: "DUMMY"};

allModelOptions.unshift(dummyModelOption);

const allCalibreOptions = [
    {id: '19', name: "19", brandId: "OMEGA"},
    {id: '30', name: "30", brandId: "OMEGA"},
    {id: '30T1', name: "30 T1", brandId: "OMEGA"},
    {id: '30T2', name: "30 T2", brandId: "OMEGA"},
];
const dummyCalibreOption = {id: 'DUMMY', name: "<Calibre Name>", brandId: "DUMMY"};

allCalibreOptions.unshift(dummyCalibreOption);
export default function OmegaInfoRenderer() {
    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);
    const [generalCalibreInfo, setGeneralCalibreInfo] = React.useState(null);
    

    const [modelValue, setModelValue] = React.useState(allModelOptions[0]);
    const [modelOptions, setmodelOptions] = React.useState([]);
    const [modelInputValue, setModelInputValue] = React.useState('');

    const [calibreValue, setCalibreValue] = React.useState(allCalibreOptions[0]);
    //const [calibreOptions, setCalibreOptions] = React.useState([]);
    const [calibreInputValue, setCalibreInputValue] = React.useState('');

    const decodeWatchInfo = () => {
        const omegaInfoDecoder = new OmegaInfoDecoder({model: modelValue.id, calibre: calibreValue.id});
        //setGeneralModelInfo(omegaInfoDecoder.getGeneralModelInfo());
        setGeneralCalibreInfo(omegaInfoDecoder.getGeneralCalibreInfo());
    }


    return (
        <div>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Box mt={1} mb={1} mr={1}>
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
                        options={modelOptions}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Model Name" variant="outlined" />}
                    />
                </Box>
                <Box mt={1} mb={1} mr={1}>
                    <Autocomplete
                        value={calibreValue}
                        onChange={(event, newValue) => {
                            setCalibreValue(newValue);
                        }}
                        inputValue={calibreInputValue}
                        onInputChange={(event, newInputValue) => {
                            setCalibreInputValue(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={allCalibreOptions}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Calibre Name" variant="outlined" />}
                    />
                </Box>
                
            </Box>
            <Box m={1}>
            <Button variant="contained" color="primary" onClick={() => {
                        decodeWatchInfo();
                    }}
                    >Get Info
                    </Button>
                    </Box>
            {generalModelInfo &&
                <Box p={1} m={1}>
                    <OmegaGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></OmegaGeneralModelInfoRenderer>
                </Box>
            }

            {generalCalibreInfo &&
                <Box p={1} m={1}>
                    <OmegaGeneralCalibreInfoRenderer generalCalibreInfo={generalCalibreInfo}></OmegaGeneralCalibreInfoRenderer>
                </Box>
            }
        </div>
    );
}
