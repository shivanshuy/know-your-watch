/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SeikoInfoModel from './SeikoInfoModel';
import {objectTypeAnnotation} from '@babel/types';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14
    },
}))(TableCell);

const StyledINfoTypeTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        fontWeight: 'bold'
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({watchInfoLst}) {

    let watchInfoLstTemp = watchInfoLst.map((watchInfo) => {
        return Object.assign({}, watchInfo, {validation: ""})
    });


    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Info Type</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.manufacturingYearsLstLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.manufacturingYearsRangeLstLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.manufacturingMonthLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.caseBackCalibreLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.movementLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">{SeikoInfoModel.movementTypeLabel}</StyledTableCell>
                        <StyledTableCell align="left" size="small">Validation</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {watchInfoLstTemp.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledINfoTypeTableCell component="th" scope="row" size="small">
                                {SeikoInfoModel.infoTypeLabels.get(row.infoType)}
                            </StyledINfoTypeTableCell>
                            <StyledTableCell align="left" size="small">{row.manufacturingYearsLst && row.manufacturingYearsLst.join(", ")}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.manufacturingYearsRangeLst && row.manufacturingYearsRangeLst.join(" - ")}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.manufacturingMonth}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.caseBackCalibre}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.movement}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.movementType}</StyledTableCell>
                            <StyledTableCell align="left" size="small">{row.validation}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}