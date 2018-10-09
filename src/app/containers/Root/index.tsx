import * as React from 'react';

export class Root extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      /* tslint:disable-next-line:variable-name */
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}
