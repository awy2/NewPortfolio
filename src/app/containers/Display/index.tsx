import * as React from 'react';

import { Provider, inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import AppWindow from 'components/AppWindow';
import AppBar from 'components/AppBar';
import Terminal from 'components/Terminal';

import { ApplicationStore, TerminalStore } from 'app/stores';
import { STORE_APPLICATION, STORE_TERMINAL } from 'app/constants';

import * as applicationTypes from 'constants/applicationTypes';

// const update = require('immutability-helper');

const styles: React.CSSProperties = {
  flex:1,
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
};

export interface DisplayProps {
}

@inject(STORE_APPLICATION, STORE_TERMINAL)
@observer
export class Display extends React.Component<DisplayProps> {
  @observable applications =  this.props[STORE_APPLICATION] as ApplicationStore;
  @observable terminals =  this.props[STORE_TERMINAL] as TerminalStore;

  constructor(props: DisplayProps) {
    super(props);
  }

  addApplicationTest = () => {
    const applicationStore = this.applications;
    applicationStore.addApplication({ text: 'test', isOpened: false, height: 200, width:200 });
  }

  moveBox(id: string, left: number, top: number) {
    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;
    applicationStore.moveApplication(id, { left, top });
  }

  public render() {

    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;
    const terminalStore = this.props[STORE_TERMINAL] as TerminalStore;

    return (
      <Provider store={applicationStore}>
          <div style={styles}>

            {applicationStore.applications.map((app) => {
              const { id, text } = app;
              let appComponent = <div>{text}</div>;
              let terminal = null;

              switch(app.applicationType){
                case applicationTypes.Terminal:
                  terminal = terminalStore.terminals.filter( terminal => terminal.appID === app.id )[0];

                  appComponent = (
                  <Provider key={id} terminalStore={terminalStore} terminal={terminal}>
                    <Terminal />
                  </Provider>);
                break;
              }

              return (
                <Provider key={id} application={app}>
                    <AppWindow key={id}>
                      {appComponent}
                    </AppWindow>
                </Provider>
              );
            })}
            <button onClick={this.addApplicationTest}>test</button>
            <AppBar/>
          </div>
      </Provider>
    );
  }

}
