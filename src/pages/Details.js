import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import toast from 'react-hot-toast';

function Details() {
  const { _id } = useParams();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: '',
    author: '',
    summary: '',
  });

  useEffect(() => {
    axios.get(`/book/${_id}`)
      .then((res) => {
        setBook(res.data);
        setEditedBook(res.data)
      })
      .catch((error) => {
        console.log('Error fetching book details:', error);
      });
  }, [_id]);

  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const res = await axios.put(`/book/${_id}`, editedBook);
      if(res.data.success){
      setBook(editedBook)
      setIsEditing(false);
      toast.success(res.data.message)
    }else{
        toast.error(res.data.message)

      }
    } catch (error) {
      console.log('Error updating book:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  return (
    <div >
        <Header/>
      <div className='details'>
      <h1>Title: {book ? book.title : 'Loading...'}</h1>
      {isEditing ? (
        <div className='detbody'>
          <input
            type="text"
            name="title"
            value={editedBook.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            value={editedBook.author}
            onChange={handleInputChange}
          />
          <textarea
            name="summary"
            value={editedBook.summary}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
      book ? (
        <div className='detbody'>
          <h4>Author: {book.author}</h4>
          <p>Summary: {book.summary}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )
      )
    }
    </div>
    </div>
  );
}

export default Details;
