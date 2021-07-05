from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from sqlalchemy.sql import text
import requests, json
from flask import send_from_directory

app = Flask(__name__,static_folder='../frontend/build',static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://cescxuxgjwxdcd:66904ffc6b0446fc7dcc449bb5b9f7a3de73b91c730b86819c9f3ac444bdf401@ec2-54-225-228-142.compute-1.amazonaws.com:5432/d5hdadm0rppj1r'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/book_inventory'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Books(db.Model):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    googleId = db.Column(db.String(20))
    title = db.Column(db.String(100))
    authors = db.Column(db.String(100))
    publishedDate = db.Column(db.String(20))
    quantity = db.Column(db.Integer)
    imageUrl = db.Column(db.String(1000))

    def __init__(self, googleId, title, authors, publishedDate,quantity, imageUrl):
        self.googleId = googleId
        self.title = title
        self.authors = authors
        self.publishedDate = publishedDate
        self.quantity = quantity
        self.imageUrl = imageUrl

class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'googleId', 'title', 'authors', 'publishedDate', 'quantity', 'imageUrl')
        
book_schema = BookSchema()
books_schema = BookSchema(many=True)


@app.route('/getBooks', methods = ['GET'])
@cross_origin()
def get_books():
    all_books = Books.query.all()
    results = books_schema.dump(all_books)
    return jsonify(results)

@app.route('/getBook/<id>/', methods = ['GET'])
def get_book(id):
    book = Books.query.get(id)
    return book_schema.jsonify(book)

@app.route('/getBookByGoogleId/<googleId>/', methods = ['GET'])
def get_book_by_google_id(googleId):
    book = Books.query.filter_by(googleId=googleId).first()
    return book_schema.jsonify(book)

@app.route('/getFinalBooks', methods = ['GET'])
def getFinalBooks():
    searchText = request.args.get('searchText')
    res = requests.get('https://www.googleapis.com/books/v1/volumes?q='+searchText)
    data = res.json()
    myInventory = []
    for item in data['items'] :
        book = Books.query.filter_by(googleId=item['id']).first()
        if(book):
            myBook = {
                "googleId" : book.googleId,
                "title" : book.title,
                "authors" : book.authors,
                "publishedDate" : book.publishedDate,
                "quantity" : book.quantity,
                "imageUrl" : book.imageUrl
            }
            if(myBook):
                myInventory.append(myBook)
        else:
            authors = "Not Found"
            publishedDate = "Not Found"
            imageUrl = "https://i.picsum.photos/id/961/200/300.jpg?hmac=rshb15adr3WtZi83bW54uoTd2m0FuSCNwtfD74RJY0k" #dummy imageUrl
            if 'authors' in item['volumeInfo']:
                authors = item['volumeInfo']['authors'][0]
            if 'publishedDate' in item['volumeInfo']:
                publishedDate = item['volumeInfo']['publishedDate']
            if 'imageLinks' in item['volumeInfo']:
                imageUrl = item['volumeInfo']['imageLinks']['thumbnail']
            myGoogleBook = {
                "googleId" : item['id'],
                "title" : item['volumeInfo']['title'],
                "authors" : authors,
                "publishedDate" : publishedDate,
                "quantity" : -1,
                "imageUrl" : imageUrl
            }
            if(myGoogleBook):
                myInventory.append(myGoogleBook)
    return json.dumps(myInventory)

@app.route('/addBook', methods = ['POST'])
def add_book():
    googleId = request.json['googleId']
    title = request.json['title']
    authors = request.json['authors']
    publishedDate = request.json['publishedDate']
    quantity = request.json['quantity']
    imageUrl = request.json['imageUrl']

    books = Books(googleId, title, authors, publishedDate, quantity, imageUrl)
    db.session.add(books)
    db.session.commit()
    return book_schema.jsonify(books) 
    


@app.route('/updateBook/<id>/', methods = ['PUT'])
def update_book(id):
    book = Books.query.get(id)
    
    googleId = request.json['googleId']
    title = request.json['title']
    authors = request.json['authors']
    publishedDate = request.json['publishedDate']
    quantity = request.json['quantity']
    imageUrl = request.json['imageUrl']

    book.googleId = googleId
    book.title = title
    book.authors = authors
    book.publishedDate = publishedDate
    book.quantity = quantity
    book.imageUrl = imageUrl

    db.session.commit()
    return book_schema.jsonify(book)

@app.route('/updateBookByGoogleId/<googleId>/', methods = ['PUT'])
def update_book_by_google_id(googleId):
    book = Books.query.filter_by(googleId=googleId).first()
    
    googleId = request.json['googleId']
    title = request.json['title']
    authors = request.json['authors']
    publishedDate = request.json['publishedDate']
    quantity = request.json['quantity']
    imageUrl = request.json['imageUrl']

    book.googleId = googleId
    book.title = title
    book.authors = authors
    book.publishedDate = publishedDate
    book.quantity = quantity
    book.imageUrl = imageUrl

    db.session.commit()
    return book_schema.jsonify(book)


@app.route('/deleteBook/<id>/', methods = ['DELETE'])
def delete_book(id):
    book = Books.query.get(id)
    db.session.delete(book)
    db.session.commit()
    return book_schema.jsonify(book)

@app.route('/deleteBookByGoogleId/<googleId>/', methods = ['DELETE'])
def delete_book_by_google_id(googleId):
    book = Books.query.filter_by(googleId=googleId).first()
    db.session.delete(book)
    db.session.commit()
    return book_schema.jsonify(book)

@app.route('/api', methods = ['GET'])
def index():
    return{
        "tutorial" : "Flask Tutorial"
    }

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')