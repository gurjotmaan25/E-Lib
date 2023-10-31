import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './db.js'
import cors from 'cors'
import bookSchema from './models/model.js'

dotenv.config()
connectDB()


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


//FETCHING ALL BOOKS
app.get('/books', async (req, res) => {
    try {
        const books = await bookSchema.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching books',
            error: error.message,
        });
    }
});
// FETCHING A BOOK
app.get('/book/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const book = await bookSchema.findById( {_id} );
        res.json(book);
        console.log(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching books',
            error: error.message,
        });
    }
});
//ADDING A NEW BOOK
app.post('/book', async (req, res) => {
    try {
        const { title, author, summary } = req.body
        // validation
        if (!title) {
            return res.send({ message: 'Title is Required' })
        }
        if (!author) {
            return res.send({ message: 'Author is Required' })
        }
        if (!summary) {
            return res.send({ message: 'Summary is Required' })
        }
        const existbook = await bookSchema.findOne({ title: { $regex: new RegExp('^' + title + '$', 'i') } })
        // check for existing book 
        if (existbook) {
            return res.status(200).send({
                success: false,
                message: 'Already existing book'
            })
        }
        //save
        const book = await new bookSchema({ title, author, summary }).save()

        res.status(201).send({
            success: true,
            message: 'Book saved successfully',
            book
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in saving',
            error
        })
    }
})

//EDITING A BOOK    
app.put('/book/:_id', async (req, res) => {
    try {
        const _id = req.params._id; 
        const { title, author, summary } = req.body; 

        const updatedBook = await bookSchema.findOneAndUpdate(
            { _id },
            { title, author, summary },
            { new: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(201).json({
            success: true,
            message: 'Book updated successfully',
            book: updatedBook, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the book',
            error: error.message,
        });
    }
});

//DELETING A BOOK
app.delete('/book/:_id', async(req, res)=>{
    const {_id} = req.params

    try {
        const dltUser = await bookSchema.findByIdAndDelete({_id})
        if(!dltUser){
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
