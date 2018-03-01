import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types'

import Client from './Client/Client'
import NavBars from './Navbar'
import Notes from './Note/Notes'
import Note from './Note/Note'

class App extends Component {
  // fetch from the Python backend
  // componentWillMount() {
  //   fetch('http://127.0.0.1:5000/business/1')
  //   .then(res => res.json)
  // }

  render() {
    return (
      <Container>
        <NavBars />
        <Row>
          <Col xs="6">
            <Row style={{paddingBottom: '25px'}}>
              <Client />
            </Row>
            <Row>
              <Notes />
            </Row>
          </Col>
          <Col xs="6">
            <Row>
              <Note />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
