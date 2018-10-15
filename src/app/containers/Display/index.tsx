import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  DropTarget,
  DragDropContext,
  ConnectDropTarget,
  DropTargetMonitor,
  XYCoord,
} from 'react-dnd';
// import * as style from './style.css';
import reactDndHtml5Backend from 'react-dnd-html5-backend';
// import ItemTypes from 'types/ItemTypes';

import { observable } from "mobx";

import AppWindow from 'components/AppWindow';
import { ApplicationStore } from 'app/stores';
import {
  STORE_APPLICATION,
} from 'app/constants';

// const update = require('immutability-helper');

const styles: React.CSSProperties = {
  flex:1,
  height: '100vh',
  position: 'relative',
};

const boxTarget = {
  drop(
    props: DisplayProps,
    monitor: DropTargetMonitor,
    component: Display | null,
  ) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  },
};

export interface DisplayProps {
  connectDropTarget?: ConnectDropTarget
}

@inject(STORE_APPLICATION)
@DragDropContext(reactDndHtml5Backend)
@DropTarget(
  'appWindow', // ItemTypes.BOX,
  boxTarget,
  (connect: any) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
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
    const { connectDropTarget } = this.props;
    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={styles}>
          {applicationStore.Applications.map((applications) => {
            const { id, text } = applications;
            return (
                <AppWindow
                key={id}
                application={applications}
                closeEvent={applicationStore.closeApplication}
              >
                {text}
              </AppWindow>
            );
          })}
          <button onClick={this.addApplicationTest}>test</button>
        </div>,
      )
    );
  }

}
