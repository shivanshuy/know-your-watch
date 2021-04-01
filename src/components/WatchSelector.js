import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import SeikoInfoRenderer from './seiko/SeikoInfoRenderer';
import WylerInfoRenderer from './wyler/WylerInfoRenderer';
import RaketaInfoRenderer from './raketa/RaketaInfoRenderer';
import OmegaInfoRenderer from './omega/OmegaInfoRenderer';


const options = [
    {id: 'SEIKO', name: "Seiko"},
    {id: 'CITIZEN', name: "Citizen"},
    {id: 'WYLER', name: "Wyler"},
    {id: 'RAKETA', name: "Raketa"},
    {id: 'OMEGA', name: "Omega"}
];

const dummyBrandOption = {id: 'DUMMY', name: "Brand Name", brandId: "DUMMY"};
options.unshift(dummyBrandOption);

export default function ComboBox() {
    let seikoInfoDecoder;
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <Box m={1}>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Box>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
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
                </Box>
                {
                    value && value.id == "SEIKO" &&
                    <SeikoInfoRenderer></SeikoInfoRenderer>
                }

                {
                    value && value.id == "WYLER" &&
                    <WylerInfoRenderer></WylerInfoRenderer>
                }

                {
                    value && value.id == "RAKETA" &&
                    <RaketaInfoRenderer></RaketaInfoRenderer>
                }
                {
                    value && value.id == "OMEGA" &&
                    <OmegaInfoRenderer></OmegaInfoRenderer>
                }
            </Box>
        </div>
    );
}
