# Book Inventory Management #

### Introduction

A modern Web Application: made up of three main components:
- Front-end - using React.js
- Back-end - usign Python Flask
- Database - postgresql

### Description

This book inventory management system is built to manage the books in the local book inventory. 
User can search for any book from web app. Search results will contain all related books from Google Books APIs.

1. Home Page will show the available books in the local inventory with the available counts or Out of Stock if count is zero.
2. User can search for any book using Search Bar, all results from google books api will be loaded. 
3. If any book is available in local inventory, it will show option to manage the inventory where user can make changes in title, author names, available quantities.
4. Also, user will have an additional option to remove the book from the inventory using "Remove Books" option.
5. Books which are not there in local inventory and are present on google books will be shown as "Not Available"
6. User has option to add a new book to the inventory, they can also mention the quantities.

### Implementation Logic

1. Google Book API is used to search the book "https://www.googleapis.com/books/v1/volumes?q=search+terms"
2. It provides info about the book. In this project we need id, authors, publishedDate, thumbnail url, title
3. To match record with our local inventory, id (googleId) is used to find the data.
4. main.py file contains necessary CRUD APIs for Adding new book, Updating the existing books, Deleting a book.

## APIs

1. [GET] /getBooks : Get all books present in the local inventory (including Out of Stock ones)
2. [GET] /getFinalBooks?searchText=${searchText} : search book from google books, map with local inventory data and gives results with their availabilty status.
3. [POST] /addBook : to add a book
Sample Request Body: {"googleId": "7mktLCw0E2IC", "title": "Java Performance", "authors": "Charlie Hunt", "publishedDate":
"2012", "quantity": 12, "imageUrl":
"http://books.google.com/books/content?id=7mktLCw0E2IC&printsec=frontcover&img=1&zoom=1&source=gbs_api"}

4. [PUT] /updateBookByGoogleId/${googleId}/
Sample Request Body: {"googleId": "7mktLCw0E2IC", "title": "Java Performance", "authors": "Charlie Hunt", "publishedDate":
"2012", "quantity": 12, "imageUrl":
"http://books.google.com/books/content?id=7mktLCw0E2IC&printsec=frontcover&img=1&zoom=1&source=gbs_api"}

5. [DELETE] /deleteBookByGoogleId/${googleId}/


## Logic to search book in local inventory

1. Search API, (API-2 above) makes call to external google book API, get all results and for all book we search in our local inventory whether that book is present or not.
2. if present and available quantity > 0, return the data from local inventory. Front end checks the quantity count and display as "Available" with quantities.
3. if present and available quantity = 0, return the data from local inventory. Front end checks the quantity count and display as "Out of Stock".
4. if absent, return google book data with quantity = -1, return the data from local inventory. Front end checks the quantity count and display as "Not Available" .

#### Local Installation 

### Install Back-End Requirements

```sh
$ pip install -r requirements.txt
```
 
### Install Front-End Requirements

```sh
$ cd frontend
$ npm install
```

### Install Database

- Install the free community edition of [MySQL](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://www.mysql.com/products/workbench/)
- Create Scheme "book_inventory"
- Add configuration string to file config.py: ``` mysql://root:password@localhost/book_inventory ```

To populate table 'books'
```sh
$ python3
>> from main import db
>> db.create_all()

### Run Back-End

```sh
$ python3 wsgi.py
```

### Run Front-End

```sh
$ cd frontend
$ npm start
```

### Run

Open your browser to ``` http://localhost:3000 ```



#### Deploy and Run on Heroku

1. Sign up on Heroku for free. Create a new app. Name it of your choice.
2. fork https://github.com/gargabhay1999/book-inventory-management to your github account. And connect heroku to this github repository.
3. Turn on Auto Deployment
4. Click "Save" or "Proceed for Deployemnt"

## Setup Postgresql database on heroku

1. Go to Resources, search for "Heroku Postgres". Add free version of it.
2. open postgres, go to settings, copy database URI from Database credentials.
3. edit main.py in this project. Change app.config['SQLALCHEMY_DATABASE_URI'] value with the copied url (from step-2)
4. push the changees.
5. Heroku Deployment will automatically start.

Wooohooo!! We have successfully deployed our application on Heroku.
Open your app. and Play with it.

My application link: https://spoonshot-book-inventory-abhay.herokuapp.com/

Enjoy! If you have any questions, please feel free to send me a message!
