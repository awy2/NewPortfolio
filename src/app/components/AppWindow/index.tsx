import * as React from 'react';

// import ItemTypes from 'types/ItemTypes'
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {Motion, spring} from 'react-motion';
import { inject } from 'mobx-react';
import { Rnd } from 'react-rnd';

import { ApplicationModel } from 'app/models';
import { ApplicationStore } from 'app/stores';

export interface WindowProps {
  application?: ApplicationModel;
  store?: ApplicationStore;
}

export interface WindowState {
  showMovement: boolean;
  isOpened: boolean;
}

@inject('store', 'application')
export default class AppWindow extends React.Component<WindowProps, WindowState> {

  constructor(props: WindowProps) {
    super(props);

    this.state = { showMovement: true, isOpened: props.application.isOpened };

    this.onSelect = this.onSelect.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onMaximizeToggle = this.onMaximizeToggle.bind(this);
    this.onMinimizeToggle = this.onMinimizeToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      let showMovement = false;
      const { application : preApp = { isOpened : false } } = nextProps;

      if(preApp.isOpened !== this.state.isOpened ){
        showMovement = true;
      }

      if(this.state.showMovement !== showMovement ){
        this.setState({showMovement, isOpened: preApp.isOpened});
      }
  }

  onSelect = () => {
    const { application, store } = this.props;
    if(store.lastSelectedApplicationID !== application.id){
      store.onSelectApplication(application.id); 
    }
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

  getCurrentStyle = (isDragging? : boolean) => {
    const { application } = this.props;
    const { showMovement } = this.state;

    let { 
      x: newLeft,
      y: newTop,
      width: newWidth,
      height: newHeight,
    } = this.getApplicationSize();

    //let config = {stiffness: 20, damping: 40};

    return {
      x: showMovement ?  spring(newLeft) : newLeft,
      y: showMovement ?  spring(newTop) : newTop,
      width: spring(newWidth),
      height: spring(newHeight),
      opacity: spring(application.isOpened ? 1 : 0),
    };
  }

  getApplicationSize = (): { x: number, y:number, width: number, height: number } => {
    const { application } = this.props;

    const applicationBar = document.getElementById(application.getTaskbarID());
    
    let bounding;
    let { 
      left: newLeft = 0, 
      top: newTop = 0,
      width: newWidth = 0,
      height: newHeight = 0 
    } = application;

    if(application.isOpened === false 
      && applicationBar){
      bounding = applicationBar.getBoundingClientRect();
      newTop = bounding.y;
      newLeft = bounding.x;
    }

    if(application.isMaximize
      && application.isOpened){
      newWidth = window.innerWidth;
      newHeight = window.innerHeight - 32;//32 for taskbar, need to find a better solution
      newTop = 0;
      newLeft = 0;
    }

    return {
      x: newLeft,
      y: newTop,
      width: newWidth,
      height: newHeight,
    };
  }

  getDefaultStyle = () => {
    const { application } = this.props;
    return {
      x: application.left,
      y: application.top, 
      width: application.width,
      height: application.height,
      opacity: 1,
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
    const { height: appHeight, width: appWidth } = this.getApplicationSize();

    const ApplicationWindow = styled.div`
      background-Color: black;
      position: relative;
      border: 0.08rem solid gray;
      color: white;
      width: ${ appWidth }px;
      height: ${ appHeight }px;
    `;

    const AppHeader = styled.div`
      background-Color: lightgray;
      position: relative;
      color: black;
      padding: 0rem ${headerPadding}rem;
      width:${appWidth}px;
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
      <Motion defaultStyle={this.getDefaultStyle()} style={ this.getCurrentStyle() }>
       { ({x, y, height, width, opacity}) =>
        <Rnd
          size={{height, width}}
          position={{x, y}}
          onDragStart={this.onSelect}
          onDragStop={(e, d) => {
            this.onMove(d.x, d.y);
          }}
          style={{opacity, zIndex: application.sequence}}
          onResizeStart={this.onSelect}
          onResize={(e, direction, ref, delta, position) => {
            this.onResize(ref.offsetWidth, ref.offsetHeight, position.x, position.y);
          }}
          dragHandleClassName="handle"
        >
          <ApplicationWindow onClick={this.onSelect} >
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
       }
      </Motion>
    );
  }
}
