import RaketaModels from './RaketaModels';
export default class RaketaInfoDecoder {
    model;
    constructor({model}) {      
        this.model = model;
    }
    getGeneralModelInfo() {
        return RaketaModels[this.model];
    }
}