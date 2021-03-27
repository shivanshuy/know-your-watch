export default class SeikoInfoModel {
    static INFO_TYPE_SERIAL = "SERIAL";
    static INFO_TYPE_CASEBACK_CALIBRE = "CASEBACK_CALIBRE";
    static INFO_TYPE_MOVEMENT = "MOVEMENT";

    static INFO_TYPE_WATER_RESISTANCE_MARK = "WATER_RESISTANCE_MARK";
    static infoTypeLabels = new Map([
        [SeikoInfoModel.INFO_TYPE_SERIAL, 'Serial Info'],
        [SeikoInfoModel.INFO_TYPE_CASEBACK_CALIBRE, 'Caseback Calibre Info'],
        [SeikoInfoModel.INFO_TYPE_MOVEMENT, 'Movement Info'],
        [SeikoInfoModel.INFO_TYPE_WATER_RESISTANCE_MARK, 'Water Resistance Mark Info']
    ]);

    static WATER_RESISTANCE_MARK_INFO_AFTERT_68 = "Manufactured after 1968";
    static WATER_RESISTANCE_MARK_INFO_BEFORE_71 = "Manufactured before 1971";

    static manufacturingYearsLstLabel = "Manufacturing Years";
    static manufacturingYearsRangeLstLabel = "Manufacturing Years Range";
    static manufacturingMonthLabel = "Manufacturing Month";
    static movementTypeLabel = "Movement Type";

    static caseBackCalibreLabel = "Caseback Calibre";

    static movementLabel = "Movement";

    static waterResistanceMarkLabel = "Water Resistance Mark Info";

    infoType;
    manufacturingYearsLst;
    manufacturingYearsRangeLst;
    manufacturingMonth;

    caseBackCalibre;

    movement;
    movementType;
    waterResistanceMarkInfo;

}