import * as React from 'react';
import styled from 'styled-components';
//import { Icon } from 'office-ui-fabric-react/lib/Icon';
//import { inject, observer } from 'mobx-react';

export interface TerminalProps {
}

//@inject('store', 'application')
//@observer
export default class Terminal extends React.Component<TerminalProps> {
  constructor(props: TerminalProps) {
    super(props);
  }

  render() {

    const TerminalInput = styled.div`
    background-Color: black;
    position: relative;
    border: 0.08rem solid gray;
    color: white;
    width: 100%;
    `;

    return (
      <TerminalInput></TerminalInput>
    );
  }
}
