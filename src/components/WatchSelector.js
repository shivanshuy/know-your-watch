import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import SeikoInfoRenderer from './seiko/SeikoInfoRenderer';


const options = [
    {id: 'SEIKO', name: "Seiko"},
    {id: 'CITIZEN', name: "Citizen"},
    {id: 'WYLER', name: "Wyler"},    
];

const allModelOptions = [
    {id: 'LM', name: "LM", brandId: "SEIKO"},
    {id: 'INCAFKEX', name: "Incaflex", brandId: "WYLER"}
];
const dummyModelOption = {id: 'DUMMY', name: "Model Name", brandId: "DUMMY"};

allModelOptions.unshift(dummyModelOption);

export default function ComboBox() {
    let seikoInfoDecoder;
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [modelValue, setModelValue] = React.useState(allModelOptions[0]);
    const [modelOptions, setmodelOptions] = React.useState([]);
    const [modelInputValue, setModelInputValue] = React.useState('');

    let updateModelOptions = (brandValue) => {
        setModelValue(allModelOptions[0]);
        let tempModelOptions = allModelOptions.filter((model) => {
            if (brandValue && model.brandId === brandValue.id) {
                return model;
            }
        })

        let mdlOptions = tempModelOptions == [] ? [dummyModelOption] : tempModelOptions;

        setmodelOptions(mdlOptions);
    }

    return (
        <div style={{ marginTop: "20px"}}>
            <Box display="flex" flexDirection="row" bgcolor="background.paper">
                <Box m={1} bgcolor="background.paper">
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            updateModelOptions(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={options}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Brand Name" variant="outlined" />}
                    />
                </Box>
                <Box m={1} bgcolor="background.paper">
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
            </Box>
            {
                value && value.id == "SEIKO" &&
                <SeikoInfoRenderer></SeikoInfoRenderer>
            }
        </div>
    );
}
