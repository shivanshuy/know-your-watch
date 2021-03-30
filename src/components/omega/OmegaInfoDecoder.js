import OmegaModels from './OmegaModels';
export default class OmegaInfoDecoder {
    model;
    constructor({model}) {      
        this.model = model;
    }
    getGeneralModelInfo() {
        return OmegaModels[this.model];
    }
}