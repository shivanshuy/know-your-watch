/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SeikoInfoModelRenderer from './SeikoInfoModelRenderer';
import SeikoInfoDecoder from './SeikoInfoDecoder'

const waterResistOptions = [
    {id: 'WATERPROOF', name: "Water Proof"},
    {id: 'WATERRESIST', name: "Water Resist"}
];


export default function SeikoInfoRenderer() {
    const [serialValue, setSerialValue] = React.useState("");
    const [calibreValue, setCalibreValue] = React.useState("");
    const [movementValue, setmovementValue] = React.useState("");

    const [manufacturingYearValue, setManufacturingYearValue] = React.useState([]);
    const [manufacturingMonthValue, setManufacturingMonthValue] = React.useState("");

    const [waterResistValue, setWaterResistValue] = React.useState("");
    const [waterResistInputValue, setWaterResistInputValue] = React.useState("");

    //const [warningMessage, setWarningMessage] = React.useState([]);

    const [serialNumberInfo, setSerialNumberInfo] = React.useState(null);

    const [casebackCalibreInfo, setCasebackCalibreInfo] = React.useState(null);

    const [movementInfo, setMovementInfo] = React.useState(null);

    const [waterResistanceMarkInfo, setWaterResistanceMarkInfo] = React.useState(null);

    let seikoInfoDecoder;

    return (
        <div>
            <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={1} m={1}>
                
                <Box m={1} display="flex" flexDirection="row" bgcolor="background.paper">
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
                <Box display="flex" flexDirection="row" m={1} bgcolor="background.paper">
                    <Box m={1} fontWeight="fontWeightBold" >Caseback Calibre</Box>
                    <TextField
                        id="standard-basic"
                        label="Caseback Calibre"
                        variant="outlined"
                        value={calibreValue}
                        onChange={(event) => {
                            setCalibreValue(event.target.value);

                        }} />
                </Box>
                <Box m={1} display="flex" flexDirection="row" bgcolor="background.paper">
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
                <Box m={1} display="flex" flexDirection="row" bgcolor="background.paper">
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
                        seikoInfoDecoder = new SeikoInfoDecoder({
                            serialNum: serialValue,
                            caseBackCalibre: calibreValue,
                            movement: movementValue,
                            waterResist: waterResistValue.id
                        });
                        setSerialNumberInfo(seikoInfoDecoder.getDecodedSerialNumberInfo());
                        setCasebackCalibreInfo(seikoInfoDecoder.getDecodedCasebackCalibreInfo());
                        setMovementInfo(seikoInfoDecoder.getDecodedMovementInfo());
                        setWaterResistanceMarkInfo(seikoInfoDecoder.getDecodedWaterReststanceMarkInfo());
                    }}
                    >Get Info
                    </Button>
                </Box>
            </Box>

            <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
                <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                    {serialNumberInfo && <SeikoInfoModelRenderer seikoInfoModel={serialNumberInfo}></SeikoInfoModelRenderer>}
                    <br />
                    {casebackCalibreInfo &&
                        casebackCalibreInfo.map((casebackCalibre, index) => (
                            <SeikoInfoModelRenderer seikoInfoModel={casebackCalibre}></SeikoInfoModelRenderer>
                        ))
                    }
                    <br />
                    {movementInfo && <SeikoInfoModelRenderer seikoInfoModel={movementInfo}></SeikoInfoModelRenderer>}
                    <br />
                    {waterResistanceMarkInfo && <SeikoInfoModelRenderer seikoInfoModel={waterResistanceMarkInfo}></SeikoInfoModelRenderer>}
                </Box>
            </Box>

        </div>
    );
}
