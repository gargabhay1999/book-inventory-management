import React from 'react'
import {useState} from 'react';
import BookCard from './BookCard';
import Form from './Form';
import {Card, CardGroup, Button} from 'react-bootstrap';
import APIService from '../components/APIService';
import { Modal } from 'react-bootstrap';

function BookList(props) {

    const [editedBook, setEditedBook] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editBook = (book) => {
        setEditedBook(book)
        setShow(true)
    }

    const deleteBook = (googleId) => {
        console.log(googleId)
        APIService.DeleteBook(googleId)
            .then(resp => props.deleteBook(resp))
            .catch(error => console.log(error))
    }

    const renderCard = (book, index) => {
        return (
            <Card  key={index}>
            <Card.Img  src={book.imageUrl} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                <h5>Authors: {book.authors}</h5>
                    <br></br>
                    <h5>Published Date:{book.publishedDate}</h5>
                    <br></br>
                </Card.Text>
                {book.quantity == 0 ?
                    <div>
                        <h5 style={{ color: 'red' , fontSize:'18px'}}>OUT OF STOCK</h5> 
                        <Button variant="primary" onClick={ () => editBook(book)}>Manage Inventory</Button>
                        <br/><br/>
                        <Button className="btn btn-danger" onClick={ () => deleteBook(book.googleId)}>Remove Books</Button>
                    </div>
                    : null}
                {book.quantity > 0 ?
                    <div>
                        <h5 style={{ color: 'green' , fontSize:'18px'}}>Available Qty: {book.quantity}</h5> 
                        <Button variant="primary" onClick={ () => editBook(book)}>Manage Inventory</Button>
                        <br/><br/>
                        <Button className="btn btn-danger" onClick={ () => deleteBook(book.googleId)}>Remove Books</Button>
                    </div>
                    : null}
                {book.quantity < 0 ?
                <div>
                    <h5>NOT AVAILABLE</h5> 
                    <Button className="btn btn-success" onClick={ () => editBook(book)}>Add Book</Button>
                </div>
                : null}
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
            </Card.Body>
            </Card>
            
        )
    }

    // return (
    //     <div>
    //         {editedBook ? <Form book={editedBook} updatedBook={props.updatedBook} insertedBook={props.insertedBook}/> : null }
    //         {/* <div className="grid">{props.books.map(renderCard)}</div> */}
    //         {/* <CardGroup>{props.books.map(renderCard)}</CardGroup> */}
    //     </div>
    // )
    return (
        <div>
            {/* {editedBook ? <Form book={editedBook} updatedBook={props.updatedBook} insertedBook={props.insertedBook}/> : null } */}
            <hr/>
            {
                props.books.map((book,i) => {
                    return <BookCard
                        key={i}
                        googleId={book.googleId}
                        imageUrl={book.imageUrl}
                        title={book.title}
                        authors={book.authors}
                        publishedDate={book.publishedDate}
                        quantity={book.quantity}

                        deleteBook={props.deleteBook}
                        editBook={editBook}
                        editedBook={editedBook}
                        updatedBook={props.updatedBook}
                        insertedBook={props.insertedBook}
                        book={book}
                        />
                    
                })
            }
            
        </div>

        
    )
}

export default BookList