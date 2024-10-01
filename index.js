const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const data = [
    {"id": "4f06e7eb-04a1-4ec5-8ed0-2235810de6e3", "title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "genre": "Fantasy", "publicationDate": "1954-07-29", "price": 9.99},
    {"id": "afc6606c-9848-4a2e-b9b1-3b5eb1d00c79", "title": "The Return of the King", "author": "B. Wordsmith", "genre": "Historical", "publicationDate": "1955-09-19", "price": 14.99},
    {"id": "3e419967-cfeb-4f09-8b70-42c4cfdf8a11", "title": "The Hobbit", "author": "S. Flemmings", "genre": "Comic", "publicationDate": "1937-02-10", "price": 10.99},
    {"id": "7b80e477-d6fc-48ec-b014-3219a10b2718", "title": "The Two Towers", "author": "H. Larry", "genre": "Adventure", "publicationDate": "1954-07-30", "price": 5.99},
    {"id": "b00849af-9897-47da-858f-467ede7e21bf", "title": "The Fellowship of the Ring", "author": "J.K Rowling", "genre": "Biography", "publicationDate": "1954-12-12", "price": 7.99},
    {"id": "8a7abb9a-03aa-4a11-9510-a2ac19fc6ed2", "title": "The Silmarillion", "author": "K. Paul", "genre": "Fantasy", "publicationDate": "1970-04-27", "price": 12.99},
];



app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.status(200).json(data);
});




app.get('/:id', (req, res) => {
    const found = data.find((item) => item.id === req.params.id); 
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});


app.post('/', (req, res) => {
    const newBook = {
        id: uuid.v4(),
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationDate: req.body.publicationDate,
        price: req.body.price,
    };

    data.push(newBook);

    res.status(201).json({
        message: "Book successfully created",
        book: newBook
    });
});

app.delete('/:id', (req, res) => {
    const found = data.find((item) => item.id === req.params.id);  
    if (found) {
        const targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});