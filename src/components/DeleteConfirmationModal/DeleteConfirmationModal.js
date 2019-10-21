import React, { Component } from 'react';
import { promisify } from '../../utilities';
import { Modal, Button } from 'react-bootstrap';

class DeleteConfirmationModal extends Component {

    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.closeConfirmModal();
    }

    closeAfterDelete = () => {
        this.props.closeConfirmModalAfterDelete();
    }

    deleteRecipe = (recipeId) => {
        console.log('Delete recipe: ', recipeId);
        promisify(this.props.deleteRecipe, { recipeId })
            .then(result => {
                this.closeAfterDelete();                
            })
            .catch(error => {
                console.log('ERROR: ', error);
            })
    }

    render() {
        const { deleteRecipeId } = this.props;
        return ( 
            <Modal show={this.props.showConfirmModal} onHide={() => {this.closeModal()}}>
                <Modal.Header closeButton>
                    <Modal.Title> Confirm deletion </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete recipe with id "{deleteRecipeId}" </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.closeModal()}}>
                        Close
                    </Button>
                    <Button 
                        className="btn btn-danger" 
                        variant="primary" 
                        onClick={() => { this.deleteRecipe(deleteRecipeId) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteConfirmationModal;