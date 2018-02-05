import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {EmailSignInForm} from 'redux-auth/bootstrap-theme';
import {browserHistory} from 'react-router';

class SignIn extends Component {
  render() {
    return (
      <div>
        <PageHeader>Sign In First</PageHeader>
        <p>Unauthenticated users can't access this page.</p>
        <EmailSignInForm next={() => browserHistory.push('/myplants')}/>
      </div>
    );
  }
}

export default connect(({routes}) => ({routes}))(SignIn);
