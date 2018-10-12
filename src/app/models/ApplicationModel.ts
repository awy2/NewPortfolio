const uuidv4 = require('uuid/v4');

export class ApplicationModel {
  readonly id: number;
  public text: string;
  public isOpened: boolean;
  public top: number;
  public left: number;
  public height: number;
  public width: number;

  constructor(text: string, isOpened: boolean = false, top: number, left: number, height: number, width: number) {
    this.id = uuidv4();
    this.isOpened = isOpened;
    this.text = text;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = width;
  }
}

export default ApplicationModel;
