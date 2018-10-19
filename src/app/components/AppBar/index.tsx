import * as React from 'react';
import styled from 'styled-components';
//import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { inject, observer } from 'mobx-react';
import {  observable } from 'mobx';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import { STORE_APPLICATION } from 'app/constants';
import { ApplicationStore } from 'app/stores';

export interface AppBarProps {
  store?: ApplicationStore;
}

@inject('store')
@observer
export default class AppBar extends React.Component<AppBarProps> {
  @observable applications =  this.props[STORE_APPLICATION] as ApplicationStore;

  constructor(props: AppBarProps) {
    super(props);
    this.onMinimizeToggle = this.onMinimizeToggle.bind(this);
  }

  onClose = (id: string) => {
    const { store } = this.props;
    store.closeApplication(id);
  }
  
  onMinimizeToggle = (application) => {
    const { store } = this.props;
    store.toggleApplicationMinimize(application.id);
  }

  onGetButtons = () => {
    const { store } = this.props;
    const onClickEvent = this.onMinimizeToggle;
    
    return store.Applications.map( application => 
      {
        return  {
          key: application.id,
          name: application.text,
          id: application.getTaskbarID(),
          iconProps: {
            iconName: 'Share'
          },
          onClick: () => { onClickEvent(application) }
        }
      }
    );
  }

  render() {

  const AppBar = styled.div`
    height: 2rem;
    background-color: darkgrey;
    width: 100%;
    bottom: 0px;
    position: absolute;
    opacity: 0.9;
  `;

    return (
      <AppBar>
        <CommandBar
            items={this.onGetButtons()}
            styles={{
              root: {
                height: "2rem",
                backgroundColor: "black",
              }
            }}
            ariaLabel={'Use left and right arrow keys to navigate between commands'}
          />
      </AppBar>
    );
  }
}
