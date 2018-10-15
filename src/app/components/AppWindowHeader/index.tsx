import * as React from 'react';
import styled from 'styled-components';

export interface AppWindowHeaderProps {
  id?: any
  title: string
}

const AppHeader = styled.div`
  background-Color: white;
  position: relative;
  color: black;
  padding: 0rem 1rem;
  height: 1rem;
  cursor: move;
`;

export default class AppWindowHeader extends React.Component<AppWindowHeaderProps> {
  public render() {
    const {
      title,
    } = this.props;

    return (
      <AppHeader>{title}</AppHeader>
    );
  }
}
