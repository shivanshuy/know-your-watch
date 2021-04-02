import OmegaModels, {calibreInfo} from './OmegaModels';
export default class OmegaInfoDecoder {
    model;
    calibre;

    calibrePosition;
    constructor({model, calibre, calibrePosition}) {
        this.model = model;
        this.calibre = calibre;
        this.calibrePosition = calibrePosition;
    }
    getGeneralModelInfo() {
        return OmegaModels[this.model];
    }

    getGeneralCalibreInfo() {
        return calibreInfo[this.calibre];
    }

    getCalibrePositionInfo() {
        let infoWrapper = null;
        if (this.calibrePosition == "MAINPLATE") {
            infoWrapper = {
                info: ["In watches before 1949 the movement reference was engraved on the main plate (under the balance wheel)."]
            }
        } else if (this.calibrePosition == "BRIDGE") {
            infoWrapper = {
                info: ["In watches after 1949 the movement reference was engraved directly on one of the bridges"]
            }
        }
        return infoWrapper;
    }


}