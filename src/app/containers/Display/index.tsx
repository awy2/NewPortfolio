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
import ApplicationWindow from 'app/components/ApplicationWindow';

import { observable } from "mobx";
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
  hideSourceOnDrag?: boolean
  connectDropTarget?: ConnectDropTarget
}

export interface DisplayState {
  boxes: { [key: string]: { top: number; left: number; title: string } }
}

@inject(STORE_APPLICATION)
@DragDropContext(reactDndHtml5Backend)
@DropTarget(
  'box', // ItemTypes.BOX,
  boxTarget,
  (connect: any) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
@observer
export class Display extends React.Component<
DisplayProps,
DisplayState
> {
  @observable applications =  this.props[STORE_APPLICATION] as ApplicationStore;

  constructor(props: DisplayProps) {
    super(props);

    /* tslint:disable-next-line:prefer-const */
    let boxes = {
      a: { top: 20, left: 80, title: 'Drag me around' },
      b: { top: 180, left: 20, title: 'Drag me too' },
    };


    this.state = {
      boxes,
    };
  }

  addApplicationTest = () => {
    const applicationStore = this.applications;   
    applicationStore.addApplication({text:"test", isOpened:false, top: 100, left: 100, height: 100, width:100});
  }

  moveBox(id: number, left: number, top: number) {
    const applicationStore = this.props[STORE_APPLICATION] as ApplicationStore;
    applicationStore.moveApplication(id, {left: left, top: top});
  }

  public render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const applications = this.props[STORE_APPLICATION] as ApplicationStore;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={styles}>
          {applications.Applications.map((applications) => {
            const { id, left, top, text } = applications;
            return (
                <ApplicationWindow
                key={id}
                id={id}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              >
                {text}
              </ApplicationWindow>
            );
          })}
          <button onClick={this.addApplicationTest}>test</button>
        </div>,
      )
    );
  }

}
