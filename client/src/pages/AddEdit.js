import React, {useState, useEffect} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import './addEdit.css'
import axios from 'axios'

const initialState = {
    name: '',
    email: '',
    contact: ''
}

function AddEdit() {
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const {name, email, contact} = state;

    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then(response => setState({...response.data[0]}))
    }, [id])

    const handleSubmit = e => {
        e.preventDefault();
        if(!name || !email || !contact) {
            alert('Please fill all input fields!')
        } else {
            if(!id) {
                axios.post('http://localhost:5000/api/post', {
                name,
                email,
                contact
            }).then(() => {
                setState({name: '', email: '', contact: ''})
            }).catch(err => alert(err.response.data));
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                name,
                email,
                contact
            }).then(() => {
                setState({name: '', email: '', contact: ''})
            }).catch(err => alert(err.response.data));
            alert('Contact Updated Sucessfully!');
            }
            
            setTimeout(()=> 
                navigate('/'), 500)
        }
    }

    const inputHandler = e => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }


  return (
    <div className='addedit_container'>
        <h2>Add and Edit Page</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: </label>
            <input type='text' id='name' name='name' placeholder='Your Name...'
            value={name || ""}
            onChange={inputHandler}
            /><br />
            <label htmlFor='email'>Email: </label>
            <input type='email' id='email' name='email' placeholder='Your Email...'
            value={email || ""}
            onChange={inputHandler}
            /><br />
            <label htmlFor='contact'>Contact: </label>
            <input type='number' id='contact' name='contact' placeholder='Your Contact...'
            value={contact || ""}
            onChange={inputHandler}
            /><br />
            <input type='submit' className='btn btn-save' value={id ? 'UPDATE' : 'SAVE'} /><br />
            <Link to='/'>
            <input type='button' className='btn btn-back' value='Go Back' />
            </Link>
        </form>
    </div>
  )
}

export default AddEdit