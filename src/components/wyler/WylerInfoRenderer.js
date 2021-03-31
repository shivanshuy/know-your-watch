/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WylerInfoDecoder from './WylerInfoDecoder';
import WylerGeneralModelInfoRenderer from './WylerGeneralModelInfoRenderer';

const allModelOptions = [
    {id: 'INCAFLEX', name: "Incaflex", brandId: "WYLER"},
];
const dummyModelOption = {id: 'DUMMY', name: "Model Name", brandId: "DUMMY"};

allModelOptions.unshift(dummyModelOption);

export default function WylerInfoRenderer() {
    const [modelValue, setModelValue] = React.useState(allModelOptions[0]);
    const [modelOptions, setmodelOptions] = React.useState([]);
    const [modelInputValue, setModelInputValue] = React.useState('');

    const [generalModelInfo, setGeneralModelInfo] = React.useState(null);

    
    const getWatchInfo = (modelVal) =>{
        const wylerInfoDecoder = new WylerInfoDecoder({model: modelVal});
        setGeneralModelInfo(wylerInfoDecoder.getGeneralModelInfo());
    }

    return (
        <div>
            <Box m={1}>
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
                <Box p={1} m={1}>
                    <WylerGeneralModelInfoRenderer generalModelInfo={generalModelInfo}></WylerGeneralModelInfoRenderer>
                </Box>
            }
        </div>
    );
}
