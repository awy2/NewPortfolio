import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { ApplicationModel } from 'app/models';
import { createStores } from 'app/stores';
import { App } from 'app';
import { initializeIcons } from '@uifabric/icons';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Terminal } from 'constants/applicationTypes';

initializeIcons();

// enable MobX strict mode
useStrict(true);

const defaultApplication = [
  new ApplicationModel({
    text: 'TERMINAL',
    title: 'terminal',
    sequence: 1,
    top: 100,
    left: 100,
    height: 100,
    width: 200,
    applicationType: Terminal,
  }),
];

// prepare MobX stores
const rootStore = createStores(defaultApplication);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <Fabric>
      <App />
    </Fabric>
  </Provider>,
  document.getElementById('root'),
);
