import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

type Types = {
  key: string;
  saga: any;
  mode?: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ key, saga, mode }: Types) => (WrappedComponent: any) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;
    injectors: { injectSaga: (key: string, descriptor: any, args: any) => void; ejectSaga: (key: string) => void; };

    constructor(props: any, context: any) {
      super(props, context);

      this.injectors = getInjectors(context.store);

      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};

const useInjectSaga = ({ key, saga, mode }: Types) => {
  const context = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    // clean up
    return () => {
      injectors.ejectSaga(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useInjectSaga };
