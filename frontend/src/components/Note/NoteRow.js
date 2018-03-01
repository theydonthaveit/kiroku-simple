import React, { Component } from 'react';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';


class ClientRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            hover: false
        }
        this.toggle = this.toggle.bind(this)
        this.toggleHover = this.toggleHover.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    toggleHover() {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        var pointerHover
        this.state.hover
        ? pointerHover = {cursor: 'pointer', color: 'turquoise'}
        : pointerHover = {cursor: 'default'}

        return (
            <div>
                <h5>
                    {this.props.children.client}
                </h5>
                <p
                    onClick={this.toggle}
                    style={pointerHover}
                    onMouseEnter={this.toggleHover}
                    onMouseLeave={this.toggleHover}
                    >{this.props.children.note}
                </p>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Specific note session</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default ClientRow