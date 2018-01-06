import * as React from 'react';
import './App.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import ChartView from './components/ChartView';

var FontAwesome = require('react-fontawesome');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Navbar inverse={true} collapseOnSelect={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <FontAwesome name="thermometer" size="2x" style={{ marginBottom: '5px' }} />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Home</NavItem>
              </Nav>
              <Nav pullRight={true}>
                <NavItem eventKey={1} href="#"><FontAwesome name="cog" size="2x"/></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="Page-title">ArTM</div>
        </div>
        <div className="App-main">
          <ChartView name="Banana"/>
        </div>
      </div>
    );
  }
}

export default App;