import { TerminalInputModel } from 'app/models';

export class TerminalAppModel {
  readonly appID: string;
  commandInputs: Array<TerminalInputModel>;
  
  constructor(id: string) {
    this.appID = id;
    this.commandInputs = [];
  }
}

export default TerminalAppModel;
