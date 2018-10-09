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

import { ApplicationStore } from 'app/stores';
import {
  STORE_APPLICATION,
} from 'app/constants';

const update = require('immutability-helper');

const styles: React.CSSProperties = {
  width: 300,
  height: 300,
  border: '1px solid black',
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
@observer
@DragDropContext(reactDndHtml5Backend)
@DropTarget(
  'box', // ItemTypes.BOX,
  boxTarget,
  (connect: any) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
export class Display extends React.Component<
DisplayProps,
DisplayState
> {
  constructor(props: DisplayProps) {
    super(props);

    const applications = this.props[STORE_APPLICATION] as ApplicationStore;

    /* tslint:disable-next-line:prefer-const */
    let boxes = {
      a: { top: 20, left: 80, title: 'Drag me around' },
      b: { top: 180, left: 20, title: 'Drag me too' },
    };

    applications.todos.forEach((element) => {
      boxes[element.id] = { top: 40, left: 60, title: element.text };
    });

    this.state = {
      boxes,
    };
  }

  public render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes } = this.state;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={styles}>
          {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (
              <ApplicationWindow
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              >
                {title}
              </ApplicationWindow>
            );
          })}
        </div>,
      )
    );
  }

  public moveBox(id: string, left: number, top: number) {

    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    );
  }
}
