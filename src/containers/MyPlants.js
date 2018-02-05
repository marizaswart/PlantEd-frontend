import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class MyPlants extends Component {
  render() {
    return (
      <div>
        <PageHeader>My Plants</PageHeader>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push('/')} />
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(MyPlants);
