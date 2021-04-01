/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RaketaInfoDecoder from './RaketaInfoDecoder';
import RaketaGeneralModelInfoRenderer from './RaketaGeneralModelInfoRenderer';

const allModelOptions = [
    {id: 'BIGZERO', name: "Big Zero", brandId: "RAKETA"},
    {id: 'KOPERNIK', name: "Kopernik", brandId: "RAKETA"}
];
const dummyModelOption = {id: 'DUMMY', name: "Model Name", brandId: "DUMMY"};

allModelOptions.unshift(dummyModelOption);

export default function RaketaInfoRenderer() {

    const [modelValue, setModelValue] = React.useState(allModelOptions[0]);
    const [modelOptions, setmodelOptions] = React.useState([]);
    const [modelInputValue, setModelInputValue] = React.useState('');


    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);

    const getWatchInfo = (modelVal) =>{
        const raketaInfoDecoder = new RaketaInfoDecoder({model: modelVal});
        setGeneralModelInfo(raketaInfoDecoder.getGeneralModelInfo());
    }

    return (
        <div>
            <Box mt={2} mb={1} mr={1}>
                <Autocomplete
                    value={modelValue}
                    onChange={(event, newValue) => {
                        setModelValue(newValue);
                        getWatchInfo(newValue.id);
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
            {generalModelInfo &&
                <Box mt={1} mb={1} mr={1}>
                    <RaketaGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></RaketaGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
