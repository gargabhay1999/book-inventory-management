import React from 'react'
import { useState, useEffect } from 'react';
import Search from './Search';
import BookList from './BookList';

function Books() {

    const [books, setBooks] = useState([])
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        fetch('https://eflask-app-abhay.herokuapp.com/getBooks', {
            'method': 'GET',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setBooks(resp))
            .catch(error => console.log(error))
    }, [])


    const searchBook = (e) => {
        e.preventDefault()
        console.log(searchBook)
        return fetch(`https://eflask-app-abhay.herokuapp.com/getFinalBooks?searchText=${searchText}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setBooks(resp))
            .catch(error => console.log(error))
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    const deleteBook = (book) => {
        const new_books = books.filter(my_book => {
            if (my_book.googleId === book.googleId) {
                return false
            } else {
                return true
            }
        })
        setBooks(new_books)
    }

    const updatedBook = (book) => {
        const updatedBooks = books.map(my_book => {
            if (my_book.googleId === book.googleId) {
                return book
            } else {
                return my_book
            }
        })
        setBooks(updatedBooks)
    }

    const insertedBook = (book) => {
        const new_books = [...books, book]
        setBooks(new_books)
      }

    return (
        <div>
            <Search handleSearch={handleSearch} searchBook={searchBook} />
            <BookList books={books} deleteBook={deleteBook} updatedBook={updatedBook} insertedBook={insertedBook} />
        </div>
    )
}

export default Books
