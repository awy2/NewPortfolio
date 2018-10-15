import * as React from 'react';
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd';
// import ItemTypes from 'types/ItemTypes'

import styled from 'styled-components';

const windowSource = {
  beginDrag(props: WindowProps) {
    const { id, left, top } = props;
    return { id, left, top };
  },
};

const ApplicationWindow = styled.div`
  background-Color: black;
  position: relative;
  border: 0.05rem solid gray;
  color: white;
  cursor: move;
`;

const AppHeader = styled.div`
  background-Color: white;
  position: relative;
  color: black;
  padding: 0rem 1rem;
  height: 1rem;
  cursor: move;
`;

export interface WindowProps {
  connectDragSource?: ConnectDragSource
  connectDragPreview?: ConnectDragPreview
  isDragging?: boolean
  id?: any
  left?: number
  top?: number
  title: string
}

@DragSource(
  'appWindow', // ItemTypes.BOX,
  windowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)
export default class AppWindow extends React.Component<WindowProps> {
  public render() {
    const {
      left,
      top,
      connectDragSource,
      connectDragPreview,
      isDragging,
      children,
      title,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      connectDragPreview &&
      connectDragSource &&
      connectDragPreview(
        <div style={{ position:"absolute", boxShadow:"0.2rem 0.2rem 0.5rem grey",left, top}}>
          <ApplicationWindow>
            {connectDragSource(<div><AppHeader>{title}</AppHeader></div>)}
            {children}
          </ApplicationWindow>
        </div>)
    );
  }
}
