import * as React from 'react';
import styledComponents from 'styled-components';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { inject, observer } from 'mobx-react';
import {  observable } from 'mobx';

//import { STORE_TERMINAL } from 'app/constants';
import { TerminalStore } from 'app/stores';
import { TerminalAppModel } from 'app/models';

export interface TerminalProps {
  terminal?: TerminalAppModel;
  terminalStore?: TerminalStore;
}

interface TerminalState {
  commands: Array<String>;
}

@inject('terminalStore', 'terminal')
@observer
export default class Terminal extends React.Component<TerminalProps, TerminalState> {
  @observable terminal = this.props.terminalStore as TerminalStore;

  constructor(props: TerminalProps) {
    super(props);

    this.runCommand = this.runCommand.bind(this);
  }

  getCommandHistory(){
    const { terminal } = this.props;
    let commandsDisplay = [];

    if(terminal
      && terminal.commandInputs){
        terminal.commandInputs.forEach( (command) => {
        commandsDisplay.push(<div key={command.id}>{ command.input }</div>);
      })
    }
    return commandsDisplay;
  }

  runCommand(e){
    if(e.key !== 'Enter'){
      return;
    }

    const { terminalStore, terminal } = this.props;
    terminalStore.addTerminalInput(terminal.appID, e.currentTarget.value);
  }

  render() {

    const TerminalDisplay = styledComponents.div`
    background-color: black;
    position: relative;
    color: white;
    width: 100%;
    height: calc(100% - 1rem);
    overflow-y: auto;
    `; //TODO change 1rem to something else. keep css values in a file

    const TerminalInput = styledComponents.input.attrs({
      type: 'text'
    })`
      border: 1px solid palevioletred;
      display: block;
    
      ::placeholder {
        color: palevioletred;
      }
    `;

    return (
      <TerminalDisplay>
        { this.getCommandHistory() }
        <TerminalInput onKeyPress={this.runCommand} />
      </TerminalDisplay>
    );
  }
}
