import React, {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';


function AddBook() {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [summary, setSummary] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/book', { title, author, summary})
            if(res.data.success){
            setTitle('');
            setAuthor('');
            setSummary('');
            toast.success(res.data.message)
            navigate('/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <Header/>
        <form className='detbody' onSubmit={handleSubmit}>
                    <input type="text" value={title}  onChange={(e)=> setTitle(e.target.value)} placeholder='Title'/>
                    <input type="text" value={author}  onChange={(e)=> setAuthor(e.target.value)} placeholder='Author'/>
                    <textarea type="text" value={summary}  onChange={(e)=> setSummary(e.target.value)} placeholder='Summary Here'/>
                    <button type="submit">Add Book</button>
        </form>
    </div>
  )
}

export default AddBook