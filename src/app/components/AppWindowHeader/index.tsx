import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { inject, observer } from 'mobx-react';

import { ApplicationStore } from 'app/stores';
import { ApplicationModel } from 'app/models';
/*
import {
  STORE_APPLICATION,
} from 'app/constants';
*/


export interface AppWindowHeaderProps {
  store?: ApplicationStore;
  application?: ApplicationModel;
}

@inject('store', 'application')
@observer
export default class AppWindowHeader extends React.Component<AppWindowHeaderProps> {
  constructor(props: AppWindowHeaderProps) {
    super(props);
  }

  onClose = () => {
    const application = this.props.application;
    const applicationStore = this.props.store as ApplicationStore;
    applicationStore.closeApplication(application.id);
  }
  
  render() {

    const {
      application: { width, text}
    } = this.props;

    const headerPadding = 0.2;
    const headerHeight = 1;
    const iconSpacing = 0.5;

    const AppHeader = styled.div`
    background-Color: lightgray;
    position: relative;
    color: black;
    padding: 0rem ${headerPadding}rem;
    width:${width}px;
    box-sizing: border-box;
    height: ${headerHeight}rem;
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

  const AppHeaderIcons = styled.span`
  height: 100%;
    float: right;
    margin-right: ${-headerPadding}rem;
    font-size: 0.8rem;
  `;
    return (
      <AppHeader>
        {text}
        <AppHeaderIcons>
          <AppHeaderIcon><Icon iconName="FontColorSwatch" className="ms-IconExample" /></AppHeaderIcon>
          <AppHeaderIcon><Icon iconName="GridViewLarge" className="ms-IconExample" /></AppHeaderIcon>
          <AppHeaderCloseIcon onClick={this.onClose}><Icon iconName="Clear" className="ms-IconExample" /></AppHeaderCloseIcon>
        </AppHeaderIcons>
      </AppHeader>
    );
  }
}
