import React from 'react'
import {useState} from 'react';
import APIService from '../components/APIService';
import {Card, Button, Modal} from 'react-bootstrap';
import Form from './Form';

function BookCard(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBook = (googleId) => {
        console.log(googleId)
        APIService.DeleteBook(googleId)
            .then(resp => props.deleteBook(resp))
            .catch(error => console.log(error))
    }

    const editBook = (book) => {
        console.log(book)
        props.editBook(book)
        // setShow(true)
    }

    return (
        <>
        <div className="card-container" id={props.googleId}>
            {props.editedBook==props.book ? <Form book={props.editedBook} updatedBook={props.updatedBook} insertedBook={props.insertedBook}/> : null }
            <img src={props.imageUrl} alt=""/>
            <div className="desc">
                <h5>Title: {props.title}</h5>
                <h5>Author: {props.authors}</h5>
                <h5>Published Date: {props.publishedDate}</h5>
                {props.quantity == 0 ?
                    <div>
                        <h5>OUT OF STOCK</h5> 
                        <button className="btn btn-success" onClick={ () => editBook(props.book)}>Manage Inventory</button>
                        <button className="btn btn-danger" onClick={ () => deleteBook(props.googleId)}>Remove Books</button>
                    </div>
                    : null}
                {props.quantity > 0 ?
                    <div>
                        <h5>Available Qty: {props.quantity}</h5> 
                        <button className="btn btn-success" onClick={ () => editBook(props.book)}>Manage Inventory</button>
                        <button className="btn btn-danger" onClick={ () => deleteBook(props.googleId)}>Remove Books</button>
                    </div>
                    : null}
                {props.quantity < 0 ?
                <div>
                    <h5>NOT AVAILABLE</h5> 
                    <button className="btn btn-success" onClick={ () => editBook(props.book)}>Add Book</button>
                </div>
                : null}
                
            </div>
            <hr style={{ borderColor: 'orange', backgroundColor: 'green', height: 2}}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                     </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>

    )
}

export default BookCard
