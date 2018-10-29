import { observable, action } from 'mobx';
import { TerminalInputModel, TerminalAppModel } from 'app/models';
import { ApplicationStore } from 'app/stores';

export class TerminalStore {
  @observable public terminals: TerminalAppModel[];
  
  
  // TODO delete from terminal array when data is remove from app store
  @observable applicationStore: ApplicationStore;

  constructor(appStore: ApplicationStore, defaultData?: TerminalAppModel[], ) {
    this.terminals = defaultData ? defaultData: [];

    // TODO delete from terminal array when data is remove from app store
    this.applicationStore = appStore;
  }

  @action
  addTerminal = (appID: string) => {
    const newTerminal = new TerminalAppModel(appID);
    this.terminals.push(newTerminal);
  }

  @action
  closeTerminal = (appID: string) => {
    this.terminals = this.terminals.filter(application => application.appID !== appID);
  }

  @action
  addTerminalInput = (id: string, newInput: string) => {

    this.terminals = this.terminals.map((terminal) => {
      if (terminal.appID === id) {
        terminal.commandInputs.push( new TerminalInputModel({
          path: "",
          input: newInput,
          response: ""
        }))
      }
      return terminal;
    });
  }
}

export default TerminalStore;
