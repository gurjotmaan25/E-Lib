import { useState, useEffect } from 'react'
import Header from './components/Header';
import axios from 'axios'
import './index.css';
import { Link } from 'react-router-dom';
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/books').then((res) => {
      setBooks(res.data)
    }).catch((error) => {
      console.log('Error in fetching books ', error);
    })
  }, [])
  const handleDeleteClick = (_id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`/book/${_id}`)
        .then(() => {
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== _id));
        })
        .catch((error) => {
          console.log('Error deleting book:', error);
        });
    }
  };
  return (
    <div className='app'>
      <Header />
      <div className='home'>
        <h1>List of Books</h1>
        <ul className='listbody'>
          {books.length === 0 ? (
            <div className='nobook'>
              <p>No books are there.</p>
              <p>To add a book click on button in top right corner.</p>
            </div>
          ) : (
            books.map((book) => (
              <div className='list' key={book._id}>
                <div className='bookdet'>
                  <li >
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                  </li>
                </div>
                <div className='bookbtn'>
                  <Link to={`/books/${book._id}`}><button>Read Summary</button></Link>
                  <button onClick={() => handleDeleteClick(book._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
