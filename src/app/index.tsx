import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Root } from 'app/containers/Root';
import { Display } from 'app/containers/Display';

/* tslint:disable-next-line:variable-name */
export const App = hot(module)(({ history }) => (
  <Root>
    <Display />
  </Root>
));
