import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './view.css'

function View() {

    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then(response => setUser({...response.data[0]}))
    }, [id])

  return (
    <div className='view-container'>
        <strong>ID: </strong>
        <span>{id}</span>
        <br />
        <br />
        
        <strong>Name: </strong>
        <span>{user.name}</span>
        <br />
        <br />

        <strong>Email: </strong>
        <span>{user.email}</span>
        <br />
        <br />

        <strong>Contact: </strong>
        <span>{user.contact}</span>
        <br />
        <br />

        <Link to= '/'>
            <button className='btn btn-edit' >Go Back</button>

        </Link>



    </div>
  )
}

export default View