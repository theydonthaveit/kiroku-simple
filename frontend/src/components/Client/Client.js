import React, { Component } from 'react';
import { Form, FormGroup, Label, Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

import ClientRow from './ClientRow'

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
        clients: [{
            id: 0,
            client: 'Jay'
        },{
            id: 1,
            client: 'Hannah'
        }]
    }

    this.addClient = this.addClient.bind(this)
    this.eachClient = this.eachClient.bind(this)
  }

  eachClient(client, i) {
      return (
        <ClientRow
            key={i}
            index={i}
            >{client.client}
        </ClientRow>
      )
  }

    addClient() {
        alert('you can add a client')
    }

  render() {
    return (
        <Card style={{border: 0}}>
            <CardHeader style={{backgroundColor: 'white', border: 0}}>Client Queue</CardHeader>
            <CardBody>
                {this.state.clients.map(this.eachClient)}
            </CardBody>
            <CardFooter style={{backgroundColor: 'white', border: 0}}>
                <Button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={this.addClient}
                    >ADD Client</Button>
            </CardFooter>
        </Card>
    )
  }
}

export default Client;