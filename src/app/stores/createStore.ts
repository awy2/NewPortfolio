import { ApplicationModel, TerminalAppModel } from 'app/models';
import { ApplicationStore } from './ApplicationStore';
import { TerminalStore } from './TerminalStore';

import { 
         STORE_APPLICATION,
         STORE_TERMINAL
        } from 'app/constants';

export function createStores(
  defaultApplication?: ApplicationModel[]) {

  const applicationStore = new ApplicationStore(defaultApplication);

  let defaultTerminal = null;
  
  if(defaultApplication 
    && defaultApplication.length > 0){
    defaultTerminal = [new TerminalAppModel(defaultApplication[0].id)];
  }

  const terminalStore = new TerminalStore(applicationStore, defaultTerminal);

  return {
    [STORE_APPLICATION]: applicationStore,
    [STORE_TERMINAL]: terminalStore
  };
}
