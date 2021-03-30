import SeikoModels, {modelsInfo} from './SeikoModels';

export default class SeikoModelsInfoDecoder {
  static getModelsRefInfo(modelRef) {
    return SeikoModels[modelRef];
  }

  static getModelsInfo(modelRef) {
    return modelsInfo[modelRef];;
  }
}