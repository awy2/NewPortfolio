import { observable } from 'mobx';

export class ApplicationModel {
  readonly id: number;
  @observable public text: string;
  @observable public isOpened: boolean;
  @observable public top: number;
  @observable public left: number;
  @observable public height: number;
  @observable public width: number;

  constructor(text: string, isOpened: boolean = false, top: number, left: number, height: number, width: number) {
    this.id = ApplicationModel.generateId();
    this.isOpened = isOpened;
    this.text = text;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = width;
  }

  static nextId = 1;
  static generateId() {
    return this.nextId + 1;
  }
}

export default ApplicationModel;
