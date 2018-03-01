import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

class Note extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this)
  }

  // send to database
  save(e) {
    alert(`${this._newNote.value}: ${this._newTitle.value}`)
  }

  render() {
    return (
        <div>
          <h4>Notes</h4>
          <form onSubmit={this.save}>
            <h6>Title</h6>
            <input ref={title => this._newTitle = title} placeholder="Enter a title" />
            <h6>Note</h6>
            <textarea ref={input => this._newNote = input} placeholder="taking notes" />
            <button>Submit</button>
          </form>
        </div>
    )
  }
}

export default Note;