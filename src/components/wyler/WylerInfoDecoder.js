import WylerModels from './WylerModels';
export default class WylerInfoDecoder {
    model;
    constructor({model}) {      
        this.model = model;
    }
    getGeneralModelInfo() {
        return WylerModels[this.model];
    }
}