import React, { Component } from 'react';
import { Form, FormGroup, Label, Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

import NoteRow from './NoteRow'

class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {
        notes: [{
            id: 0,
            client_id: '0',
            client: 'Jay',
            note: 'Cool person'
        },{
            id: 1,
            client_id: '0',
            client: 'Hannah',
            note: 'Cool person'
        }]
    }

    this.addNote = this.addNote.bind(this)
    this.eachNote = this.eachNote.bind(this)
  }

  eachNote(note, i) {
      return (
        <NoteRow
            key={i}
            index={i}
            >{note}
        </NoteRow>
      )
  }

  addNote() {
    alert('you can add a note')
  }

  renderClient() {
    //   render notes based on client
  }

  render() {
    return (
        <Card style={{border: 0}}>
            <CardHeader style={{backgroundColor: 'white', border: 0}}>Note List</CardHeader>
            <CardBody>
                {this.state.notes.map(this.eachNote)}
            </CardBody>
        </Card>
    )
  }
}

export default Notes;