import React, { Component } from "react";
import { Card, Button, Modal, Image, Header } from "semantic-ui-react";
import CardGroup from "semantic-ui-react/dist/commonjs/views/Card/CardGroup";
import propTypes from "prop-types";
import Block from "../Block"

export default class BlockComponent extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.block = this.props.block;
        this.state = {
            modalOpen: true
        }
    }

    render() {

        let ViewButton = () => {
            return (
                <Modal trigger={<Button>View</Button>}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        }
        return (
            <Card>
                <Card.Content>
                    <Card.Meta>Block ID: {(this.block.id == 0) ? "Genesis" : this.block.id}</Card.Meta>
                    <Card.Description>Hash: {this.block.hash.substring(0, 20) + "..."}</Card.Description>
                    <Card.Description>Date: {this.block.timestamp.toUTCString()}</Card.Description>
                    <Card.Description>Transaction Count: {this.block.data.length}</Card.Description>
                    <br />
                    <ViewButton />
                    <Button>Change</Button>
                </Card.Content>
            </Card>
        )
    }
}

BlockComponent.propTypes = {
    block: propTypes.instanceOf(Block)
}