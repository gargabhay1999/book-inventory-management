import React from 'react'
import APIService from '../components/APIService';

function BookCard(props) {

    const deleteBook = (googleId) => {
        console.log(googleId)
        APIService.DeleteBook(googleId)
            .then(resp => props.deleteBook(resp))
            .catch(error => console.log(error))
    }

    const editBook = (book) => {
        console.log(book)
        props.editBook(book)
    }

    return (
        <div className="card-container" id={props.googleId}>
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
            <hr/>
        </div>
    )
}

export default BookCard
