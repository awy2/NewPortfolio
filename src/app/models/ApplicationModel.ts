const uuidv4 = require('uuid/v4');

interface IApplicationModel {
  text: string;
  title: string;
  sequence: number;
  isMaximize?: boolean;
  top: number;
  left: number;
  height: number;
  width: number;
}

export class ApplicationModel {
  readonly id: string;

  public isOpened: boolean;
  public isMaximize: boolean;
  public text: string;
  public title: string;

  public sequence: number;
  public top: number;
  public left: number;
  public height: number;
  public width: number;

  constructor(obj: IApplicationModel) {

    this.id = uuidv4();
    this.sequence = obj.sequence;
    this.isOpened = true;
    this.isMaximize = obj.isMaximize;
    this.text = obj.text;
    this.title = obj.title;

    this.top = obj.top;
    this.left = obj.left;
    this.height = obj.height;
    this.width = obj.width;
  }

  getTaskbarID = (): string => {
    return `taskbar_${this.id}`;
  }
}

export default ApplicationModel;
