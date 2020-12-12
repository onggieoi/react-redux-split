import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'src/containers/App/selectors';
import { loadRepos } from 'src/containers/App/actions';
import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

type Props = {
  username: string;
  loading: boolean;
  error: any,
  repos: any,
  onSubmitForm: any,
  onChangeUsername: any,
}

export const Homepage: React.FC<Props> = ({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  console.log(username, loading, error, repos);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React test application homepage"
        />
      </Helmet>
      <div>HomePage</div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChangeUsername: (evt: any) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt: any) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Homepage);
