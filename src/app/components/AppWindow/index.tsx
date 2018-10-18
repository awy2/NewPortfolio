import * as React from 'react';

// import ItemTypes from 'types/ItemTypes'
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { inject } from 'mobx-react';
import { Rnd } from 'react-rnd';

import { ApplicationModel } from 'app/models';
import { ApplicationStore } from 'app/stores';

export interface WindowProps {
  application?: ApplicationModel;
  store?: ApplicationStore;
}

@inject('store', 'application')
export default class AppWindow extends React.Component<WindowProps> {
  
  constructor(props: WindowProps) {
    super(props);
    
    this.onMove = this.onMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onMaximizeToggle = this.onMaximizeToggle.bind(this);
    this.onMinimizeToggle = this.onMinimizeToggle.bind(this);
  }

  onMove = (left: number, top: number) => {
    const { application, store } = this.props;
    store.moveApplication(application.id, { left, top });
  }
  
  onResize = (width: number, height: number, left: number, top: number) => {
    const { application, store } = this.props;
    store.resizeApplication(application.id, { height, width, left, top });
  }

  onClose = () => {
    const { application, store } = this.props;
    store.closeApplication(application.id);
  }

  onMaximizeToggle = () => {
    const { application, store } = this.props;
    store.toggleApplicationMaximize(application.id);
  }
  
  onMinimizeToggle = () => {
    const { application, store } = this.props;
    store.toggleApplicationMinimize(application.id);
  }

  getApplicationPosition = () => {
    const { application } = this.props;
    return {
      x: application.left,
      y: application.top, 
    };
  }

  getApplicationSize = () => {
    const { application } = this.props;
    return {
      width: application.width,
      height: application.height,
    };
  }
  
  public render() {
    const {
      children,
      application, 
    } = this.props;

    const headerPadding = 0.2;
    const headerHeight = 1;
    const iconSpacing = 0.5;

    const ApplicationWindow = styled.div`
      background-Color: black;
      position: relative;
      border: 0.05rem solid gray;
      color: white;
      width: ${application.width}px;
      height: ${application.height}px;
    `;

    const AppHeader = styled.div`
      background-Color: lightgray;
      position: relative;
      color: black;
      padding: 0rem ${headerPadding}rem;
      width:${application.width}px;
      box-sizing: border-box;
      height: ${headerHeight}rem;
    `;

    const AppHeaderText = styled.div`
      width:auto;
      overflow: hidden;
    `;

    const AppHeaderIcons = styled.span`
      height: 100%;
      float: right;
      margin-right: ${-headerPadding}rem;
      font-size: 0.8rem;
    `;

    const AppHeaderIcon = styled.span`
      padding: 0 ${iconSpacing}rem;
      height: 100%;

      &:hover{
        background-Color: grey;
      }
    `;

    const AppHeaderCloseIcon = styled.span`
      height: 100%;
      padding: 0 ${iconSpacing}rem;
      &:hover{
        height: ${headerHeight}rem;
        background-Color: red;
      }
    `;
     
    return (
      <Rnd
        size={this.getApplicationSize()}
        position={this.getApplicationPosition()}
        onDragStop={(e, d) => {
          this.onMove(d.x, d.y);
        }}

        onResize={(e, direction, ref, delta, position) => {
          this.onResize(ref.offsetWidth, ref.offsetHeight, position.x, position.y);
        }}
        dragHandleClassName="handle"
      >
        <ApplicationWindow>
          <AppHeader>
            <AppHeaderIcons>
              <AppHeaderIcon><Icon onClick={this.onMinimizeToggle} iconName="FontColorSwatch" className="ms-IconExample" /></AppHeaderIcon>
              <AppHeaderIcon><Icon onClick={this.onMaximizeToggle} iconName="GridViewLarge" className="ms-IconExample" /></AppHeaderIcon>
              <AppHeaderCloseIcon onClick={this.onClose}><Icon iconName="Clear" className="ms-IconExample" /></AppHeaderCloseIcon>
            </AppHeaderIcons>
            <AppHeaderText className="handle">{application.text}</AppHeaderText>
          </AppHeader>
          {children}
        </ApplicationWindow>
      </Rnd>
    );
  }
}
