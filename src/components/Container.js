import React, { Component, PropTypes } from 'react';
import { Grid, Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Container extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar className="main-nav">
          <LinkContainer to="/">
            <Navbar.Brand>PlantEd</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to="/" onlyActiveOnIndex>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/myplants">
              <NavItem eventKey={2}>My Plants</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Grid className="content">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default Container;
