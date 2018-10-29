const uuidv4 = require('uuid/v4');

interface ITerminalInputModel {
  path: string;
  input: string;
  response?: string;
}

export class TerminalInputModel {
  readonly id: string;

  public path: string;
  public input: string;
  public response?: string;
  
  constructor(obj: ITerminalInputModel) {

    this.id = uuidv4();
    this.path = obj.path;
    this.input = obj.input;
    this.response = obj.response;
  }
}

export default TerminalInputModel;
