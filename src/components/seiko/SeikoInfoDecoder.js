import SeikoMovements from './seikoMvmtHist';
import SeikoInfoModel from './SeikoInfoModel';
import SeikoModelsInfoDecoder from './SeikoModelsInfoDecoder';

export default class SeikoInfoDecoder {
    serialNum;
    modelReference;
    model;
    caseCode;
    waterResist;
    movement;
    caseBackCalibre;
    manufacturingYearRange;
    manufacturingMonth;
    MONTH_MAP = new Map([
        ['1', 'Jan'],
        ['2', 'Feb'],
        ['3', 'March'],
        ['4', 'April'],
        ['5', 'May'],
        ['6', 'June'],
        ['7', 'July'],
        ['8', 'Aug'],
        ['9', 'Sept'],
        ['O', 'Oct'],
        ['N', 'Nov'],
        ['D', 'Dec']
    ]);

    warnings = [];

    constructor({serialNum, model, modelReference, caseBackCalibre, movement, caseCode, waterResist}) {
        this.serialNum = serialNum;
        this.modelReference = modelReference;
        this.model = model;
        this.movement = movement;
        this.caseBackCalibre = caseBackCalibre;
        this.caseCode = caseCode;
        this.waterResist = waterResist;
    }

    getDecodedSerialNumberInfo() {
        if (this.serialNum) {
            let seikoInfoModel = new SeikoInfoModel();
            const before68 = [1910, 1920, 1930, 1940, 1950, 1960];
            const after68 = [1970, 1980, 1990,2000, 2010, 2020];
            let yearRange;
            if (this.serialNum.toString().length === 7) {
                yearRange = before68;
            } else {
                yearRange = after68;
            }

            const lstDgtOfYear = parseInt(this.serialNum.toString().charAt(0));
            const tmpYearRange = yearRange.map(year => {
                return year + lstDgtOfYear;
            });

            seikoInfoModel.manufacturingYearsLst = tmpYearRange;
            seikoInfoModel.manufacturingMonth = this.decodeSerialNumberForManufacturingMonth();
            seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_SERIAL;
            return seikoInfoModel;
        }
        return null;
    }

    getDecodedModelReferenceInfo() {
        if (this.modelReference) {
            const modelReferenceSplit = this.modelReference.split("-");
            let caseBackClbr = modelReferenceSplit[0];
            let seikoInfoModelLst;
            let seikoInfoModel;
            let temCalibreHistLst = SeikoMovements.filter((mvmt) => {
                if (mvmt.calibre == caseBackClbr) {
                    return mvmt;
                }
            });
            if (temCalibreHistLst && temCalibreHistLst.length > 0) {
                seikoInfoModelLst = [];
                temCalibreHistLst.forEach((temCalibre) => {
                    seikoInfoModel = new SeikoInfoModel();
                    seikoInfoModel.manufacturingYearsRangeLst = [temCalibre.startYear, temCalibre.endYear];
                    seikoInfoModel.movementType = temCalibre.type;
                    seikoInfoModel.caseBackCalibre = temCalibre.calibre;
                    seikoInfoModel.movement = temCalibre.mvmt;
                    seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_MODEL_REFERENCE;
                    seikoInfoModelLst.push(seikoInfoModel);
                });
                return seikoInfoModelLst;
            }
        }
        return null;
    }

    getDecodedModelInfo() {
        if (this.model) {            
            if(this.model == "SQ"){
                let seikoInfoModel = new SeikoInfoModel();
            seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_MODEL;
                seikoInfoModel.manufacturingYearsRangeLst = [1970, 1990];
                seikoInfoModel.movementType = "Quartz";
                return seikoInfoModel;
            }else if(this.model == "ADVAN"){
                let seikoInfoModel = new SeikoInfoModel();
            seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_MODEL;
                seikoInfoModel.manufacturingYearsRangeLst = [1970, 1980];
                return seikoInfoModel;
            }
        }
        return null;
    }

    getDecodedCasebackCalibreInfo() {
        if (this.caseBackCalibre) {
            let seikoInfoModelLst;
            let seikoInfoModel;
            let temCalibreHistLst = SeikoMovements.filter((mvmt) => {
                if (mvmt.calibre == this.caseBackCalibre) {
                    return mvmt;
                }
            });
            if (temCalibreHistLst && temCalibreHistLst.length > 0) {
                seikoInfoModelLst = [];
                temCalibreHistLst.forEach((temCalibre) => {
                    seikoInfoModel = new SeikoInfoModel();
                    seikoInfoModel.manufacturingYearsRangeLst = [temCalibre.startYear, temCalibre.endYear];
                    seikoInfoModel.movementType = temCalibre.type;
                    seikoInfoModel.caseBackCalibre = temCalibre.calibre;
                    seikoInfoModel.movement = temCalibre.mvmt;
                    seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_CASEBACK_CALIBRE;
                    seikoInfoModelLst.push(seikoInfoModel);
                });
                return seikoInfoModelLst;
            }
        }
        return null;
    }

    getDecodedMovementInfo() {
        if (this.movement) {
            let seikoInfoModel = new SeikoInfoModel();
            let tempMovementHist = SeikoMovements.find((mvmt) => {
                if (mvmt.mvmt == this.movement) {
                    return mvmt;
                }
            });
            if (tempMovementHist) {
                seikoInfoModel.manufacturingYearsRangeLst = [tempMovementHist.startYear, tempMovementHist.endYear];
                seikoInfoModel.movementType = tempMovementHist.type;
                seikoInfoModel.caseBackCalibre = tempMovementHist.calibre;
                seikoInfoModel.movement = tempMovementHist.mvmt;
                seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_MOVEMENT;
                return seikoInfoModel;
            }
        }
        return null;
    }

    getDecodedWaterReststanceMarkInfo() {
        if (this.waterResist) {
            let seikoInfoModel = new SeikoInfoModel();
            seikoInfoModel.infoType = SeikoInfoModel.INFO_TYPE_WATER_RESISTANCE_MARK;
            if (this.waterResist === "WATERPROOF") {
                //seikoInfoModel.waterResistanceMarkInfo = SeikoInfoModel.WATER_RESISTANCE_MARK_INFO_BEFORE_71;
                seikoInfoModel.manufacturingYearsRangeLst = [1900, 1971]
            } else if (this.waterResist === "WATERRESIST") {
                //seikoInfoModel.waterResistanceMarkInfo = SeikoInfoModel.WATER_RESISTANCE_MARK_INFO_AFTERT_68;
                seikoInfoModel.manufacturingYearsRangeLst = [1968, 9999]
            }
            return seikoInfoModel;
        }
        return null;
    }

    getGeneralModelRefInfo(){
        return SeikoModelsInfoDecoder.getModelsRefInfo(this.modelReference);
    }

    getGeneralModelInfo(){
        return SeikoModelsInfoDecoder.getModelsInfo(this.model);
    }
    decodeSerialNumberForManufacturingYearRange() {
        const before68 = [10, 20, 30, 40, 50, 60];
        const after68 = [70, 80, 90];
        let yearRange;
        if (this.serialNum.toString().length === 7) {
            yearRange = before68;
        } else {
            yearRange = after68;
        }

        const lstDgtOfYear = parseInt(this.serialNum.toString().charAt(0));
        const tmpYearRange = yearRange.map(year => {
            return year + lstDgtOfYear;
        });

        if (this.waterResist === "WATERPROOF") {
            let after71 = tmpYearRange.some((element) => element > 71)
            if (after71) {
                this.warnings.push("Water Proof marking was not used after 71");
            }
        } else if (this.waterResist === "WATERRESIST") {
            let before68 = tmpYearRange.some((element) => element < 68)
            if (before68) {
                this.warnings.push("Water Resist marking was not used before 68");
            }
        }

        let temMovementHist;
        if (this.movement) {
            temMovementHist = SeikoMovements.find((mvmt) => {
                if (mvmt.mvmt == this.movement) {
                    return mvmt;
                }
            });
        } else if (this.calibre) {
            temMovementHist = SeikoMovements.find((mvmt) => {
                if (mvmt.calibre == this.calibre) {
                    return mvmt;
                }
            });
        }


        return tmpYearRange;
    }

    decodeSerialNumberForManufacturingMonth() {
        const tempmonth = this.serialNum.toString().charAt(1);
        return this.MONTH_MAP.get(tempmonth);
    }

    getWarning() {
        return this.warnings;
    }
}