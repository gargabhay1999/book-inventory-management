import React, { useState, useEffect } from 'react'
import APIService from './APIService';

function Form(props) {

    const [googleId, setGoogleId] = useState('')
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [publishedDate, setPublishedDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [imageUrl, setImageUrl] = useState('')


    useEffect(() => {
        setGoogleId(props.book.googleId)
        setTitle(props.book.title)
        setAuthors(props.book.authors)
        setPublishedDate(props.book.publishedDate)
        setQuantity(props.book.quantity)
        setImageUrl(props.book.imageUrl)
    },[props.book])

    const updateBook = () => {
        APIService.UpdateBook(props.book.googleId, {googleId, title, authors, publishedDate, quantity, imageUrl })
            .then(resp => props.updatedBook(resp))
            .catch(error => console.log(error))
    }

    const insertBook = () => {
        console.log("sdfafd")
        console.log({googleId, title, authors, publishedDate, quantity, imageUrl })
        APIService.InsertBook({googleId, title, authors, publishedDate, quantity, imageUrl })
            .then(resp => props.updatedBook(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.book ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"> Title</label>
                    <input type="text" className="form-control"
                        placeholder="Plese Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="authors" className="form-label"> Author/s</label>
                    <input type="text" className="form-control" 
                        placeholder="Plese Enter Author/s"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />

                    <label htmlFor="quantity" className="form-label"> Quantity</label>
                    <input type="number" className="form-control" min="1"
                        placeholder="Plese Enter Quantity"
                        value={quantity>=0 ? quantity:0}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    {
                        props.book.quantity != -1 ?
                            <button
                                onClick={updateBook}
                                className="btn btn-success mt-3"
                            > Update</button>
                            :
                            <button
                                onClick={insertBook}
                                className="btn btn-success mt-3"
                            > Insert</button>
                    }


                </div>
            ) : null}


        </div>
    )
}

export default Form
