import { observable, action, reaction } from 'mobx';
import { TerminalInputModel, TerminalAppModel } from 'app/models';
import { ApplicationStore } from 'app/stores';
import { ApplicationModel } from 'app/models';
import * as applicationTypes from 'constants/applicationTypes';

export class TerminalStore {
  @observable public terminals: TerminalAppModel[];
  
  constructor(appStore: ApplicationStore, defaultData?: TerminalAppModel[], ) {
    this.terminals = defaultData ? defaultData: [];

    reaction(
      () => appStore.applications.length,
      () => { this.updateTerminalStore(appStore.getByApplicationType(applicationTypes.Terminal)); }
    );
  }

  updateTerminalStore = (applications: ApplicationModel[]) => {
    const updatedTerminalIDs = applications.map(application => application.id);
    const existingTerminalIDs = this.terminals.map(terminal => terminal.appID);

    this.terminals = this.terminals.filter(terminal => updatedTerminalIDs.includes(terminal.appID));

    updatedTerminalIDs.forEach( id => {
      if(existingTerminalIDs.includes(id) === false){
        this.addTerminal(id);
      }
    });
  }

  @action //don't think I need this anymore, since updateTerminalStore does this
  addTerminal = (appID: string) => {
    const newTerminal = new TerminalAppModel(appID);
    this.terminals.push(newTerminal);
  }

  @action //don't think I need this anymore, since updateTerminalStore does this
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
