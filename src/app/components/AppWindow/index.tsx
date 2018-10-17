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
  }

  onMove = (left: number, top: number) => {
    const application = this.props.application;
    const applicationStore = this.props.store as ApplicationStore;

    applicationStore.moveApplication(application.id, { left, top });
  }
  
  onResize = (width: number, height: number, left: number, top: number) => {
    const application = this.props.application;
    const applicationStore = this.props.store as ApplicationStore;

    applicationStore.resizeApplication(application.id, { height, width, left, top });
  }

  onClose = () => {
    const application = this.props.application;
    const applicationStore = this.props.store as ApplicationStore;
    applicationStore.closeApplication(application.id);
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
          size={{
            width: application.width,
            height: application.height,
          }}
          position={{
            x: application.left,
            y: application.top, 
          }}
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
            <AppHeaderIcon><Icon iconName="FontColorSwatch" className="ms-IconExample" /></AppHeaderIcon>
            <AppHeaderIcon><Icon iconName="GridViewLarge" className="ms-IconExample" /></AppHeaderIcon>
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
