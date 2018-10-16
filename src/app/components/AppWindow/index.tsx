import * as React from 'react';
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd';
// import ItemTypes from 'types/ItemTypes'
import styled from 'styled-components';
import { inject } from 'mobx-react';

import AppWindowHeader from 'components/AppWindowHeader';
import { ApplicationModel } from 'app/models';

const windowSource = {
  beginDrag(props: WindowProps) {
    const { id, left, top } = props.application;
    return { id, left, top };
  },
};

export interface WindowProps {
  connectDragSource?: ConnectDragSource;
  connectDragPreview?: ConnectDragPreview;
  isDragging?: boolean;
  application?: ApplicationModel;
}

@inject('application')
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
      connectDragSource,
      connectDragPreview,
      isDragging,
      children,
      application, 
    } = this.props;
    
    if (isDragging) {
      return null;
    }

    const ApplicationWindow = styled.div`
      background-Color: black;
      position: relative;
      border: 0.05rem solid gray;
      color: white;
      width: ${application.width}px;
      height: ${application.height}px;
    `;

    return (
      connectDragPreview &&
      connectDragSource &&
      connectDragPreview(
        <div style={{ 
          position:"absolute", 
          boxShadow:"0.2rem 0.2rem 0.5rem grey", 
          left: application.left, 
          top: application.top}}
        >

          <ApplicationWindow>
            {connectDragSource(<div><AppWindowHeader /></div>)}
            {children}
          </ApplicationWindow>
        </div>)
    );
  }
}
