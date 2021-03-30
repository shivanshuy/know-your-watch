export default class SeikoInfoModel {
    static INFO_TYPE_SERIAL = "SERIAL";
    static INFO_TYPE_SERIAL_LABEL = "Serial Info";

    static INFO_TYPE_MODEL_REFERENCE = "MODEL_REFERENCE";
    static INFO_TYPE_MODEL_REFERENCE_LABEL = "Model Reference Info";
    static INFO_TYPE_CASEBACK_CALIBRE = "CASEBACK_CALIBRE";
    static INFO_TYPE_MOVEMENT = "MOVEMENT";
    static INFO_TYPE_MOVEMENT_LABEL = "Movement Info";

    static INFO_TYPE_WATER_RESISTANCE_MARK = "WATER_RESISTANCE_MARK";
    static INFO_TYPE_WATER_RESISTANCE_MARK_LABEL= "Water Resistance Mark Info";

    static INFO_TYPE_MODEL = "INFO_TYPE_MODEL";
    static INFO_TYPE_MODEL_LABEL = "Model Info";
    static infoTypeLabels = new Map([
        [SeikoInfoModel.INFO_TYPE_SERIAL, 'Serial Info'],
        [SeikoInfoModel.INFO_TYPE_MODEL_REFERENCE, 'Model Reference Info'],
        [SeikoInfoModel.INFO_TYPE_CASEBACK_CALIBRE, 'Caseback Calibre Info'],
        [SeikoInfoModel.INFO_TYPE_MOVEMENT, 'Movement Info'],
        [SeikoInfoModel.INFO_TYPE_WATER_RESISTANCE_MARK, 'Water Resistance Mark Info'],
        [SeikoInfoModel.INFO_TYPE_MODEL, 'Model Info']
    ]);

    static WATER_RESISTANCE_MARK_INFO_AFTERT_68 = "Manufactured after 1968";
    static WATER_RESISTANCE_MARK_INFO_BEFORE_71 = "Manufactured before 1971";

    static manufacturingYearsLstLabel = "Prod Years";
    static manufacturingYearsRangeLstLabel = "Prod Years Range";
    static manufacturingMonthLabel = "Prod Month";
    static movementTypeLabel = "Mvmt Type";

    static caseBackCalibreLabel = "Calibre";

    static movementLabel = "Mvmt";

    static waterResistanceMarkLabel = "Water Rest";

    infoType;
    manufacturingYearsLst;
    manufacturingYearsRangeLst;
    manufacturingMonth;

    caseBackCalibre;

    movement;
    movementType;
    waterResistanceMarkInfo;

}