import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const { isAuthenticated, component: Component, ...restProps } = props;
  const ActualComponent = (componentProps) => {
    if (isAuthenticated) {
      return (
        <div>
          <Component {...componentProps} />
        </div>
      );
    }
    return <Redirect to="/" />;
  };

  return <Route {...restProps} component={ActualComponent} />;
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
