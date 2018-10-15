import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { ApplicationModel } from 'app/models';

export interface AppWindowHeaderProps {
  application: ApplicationModel
  closeEvent: (id: string) => void;
}

export default class AppWindowHeader extends React.Component<AppWindowHeaderProps> {
  constructor(props: AppWindowHeaderProps) {
    super(props);
  }

  onClose = () => {
    const {
      application: { id },
      closeEvent
    } = this.props;

    closeEvent(id);
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
