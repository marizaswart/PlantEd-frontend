import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddPlant from '../components/AddPlant';
import { browserHistory } from 'react-router';
import { SignOutButton } from 'redux-auth/bootstrap-theme';

class MyPlants extends Component {
  render() {
    return (
      <div>
        <PageHeader>My Plants</PageHeader>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push('/')} />
        <AddPlant/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(MyPlants);
