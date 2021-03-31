import OmegaModels, {calibreInfo} from './OmegaModels';
export default class OmegaInfoDecoder {
    model;
    calibre;
    constructor({model, calibre}) {      
        this.model = model;
        this.calibre = calibre;
    }
    getGeneralModelInfo() {
        return OmegaModels[this.model];
    }

    getGeneralCalibreInfo() {
        return calibreInfo[this.calibre];
    }
}