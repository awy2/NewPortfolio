import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { ApplicationModel } from 'app/models';
import { createStores } from 'app/stores';
import { App } from 'app';
import { initializeIcons } from '@uifabric/icons';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

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
  }),
];

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history, defaultApplication);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <Fabric>
      <App history={history} />
    </Fabric>
  </Provider>,
  document.getElementById('root'),
);
