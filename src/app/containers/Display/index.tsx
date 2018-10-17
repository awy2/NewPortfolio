import * as React from 'react';

import { Provider, inject, observer } from 'mobx-react';

// import ItemTypes from 'types/ItemTypes';

import { observable } from "mobx";

import AppWindow from 'components/AppWindow';
import { ApplicationStore } from 'app/stores';
import { STORE_APPLICATION } from 'app/constants';

// const update = require('immutability-helper');

const styles: React.CSSProperties = {
  flex:1,
  height: '100vh',
  position: 'relative',
};



export interface DisplayProps {

}

@inject(STORE_APPLICATION)
@observer
export class Display extends React.Component<DisplayProps> {
  @observable applications =  this.props[STORE_APPLICATION] as ApplicationStore;

  constructor(props: DisplayProps) {
    super(props);
  }

  addApplicationTest = () => {
    const applicationStore = this.applications;   
    applicationStore.addApplication({text:"test", isOpened:false, top: 100, left: 100, height: 100, width:200});
  }

  moveBox(id: string, left: number, top: number) {
    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;
    applicationStore.moveApplication(id, {left: left, top: top});
  }

  public render() {

    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;

    return (
      <Provider store={applicationStore}>
          <div style={styles}>
        
            {applicationStore.Applications.map((applications) => {
              const { id, text } = applications;
              
              return (
                <Provider key={id} application={applications}>
                    <AppWindow key={id}>
                      {text}
                    </AppWindow>
                </Provider>
              );
            })}
            <button onClick={this.addApplicationTest}>test</button>
          </div>
      </Provider>
    );
  }

}
