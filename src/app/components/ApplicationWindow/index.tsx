import * as React from 'react';
import { DragSource, ConnectDragSource } from 'react-dnd';
// import ItemTypes from 'types/ItemTypes'

import styled from 'styled-components';
/*
const style: React.CSSProperties = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};
*/

const boxSource = {
  beginDrag(props: BoxProps) {
    const { id, left, top } = props;
    return { id, left, top };
  },
};

const AppWindow = styled.h1`
  background-Color: black;
  position: absolute;
  border: 1px dashed gray;
  color: white;
  padding: 0.5rem 1rem;
  cursor: move;
`;

export interface BoxProps {
  connectDragSource?: ConnectDragSource
  isDragging?: boolean
  id?: any
  left?: number
  top?: number
  hideSourceOnDrag?: any
}

@DragSource(
  'box', // ItemTypes.BOX,
  boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)
export default class ApplicationWindow extends React.Component<BoxProps> {
  public render() {
    const {
      hideSourceOnDrag,
      left,
      top,
      connectDragSource,
      isDragging,
      children,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      connectDragSource &&
      connectDragSource(<div style={{ position:"absolute", left, top}}><AppWindow>{children}</AppWindow></div>)
    );
  }
}
