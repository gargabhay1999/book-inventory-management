import React from 'react'
import {useState} from 'react';
import BookCard from './BookCard';
import Form from './Form';
// import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubTitle, Button } from 'reactstrap';
// import { Container, Row, Col } from 'reactstrap';

function BookList(props) {

    const [editedBook, setEditedBook] = useState(null)

    const editBook = (book) => {
        setEditedBook(book)
    }

    // const openForm = () => {
    //     setEditedBook({title: '', authors: '', quantity: '', googleId: '', imageUrl: '', quantity: ''})
    // }

    

    return (
        <div>
            {editedBook ? <Form book={editedBook} updatedBook={props.updatedBook} insertedBook={props.insertedBook}/> : null }
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
                        book={book}
                        />
                    
                })
            }
            
        </div>

        
    )
}

export default BookList