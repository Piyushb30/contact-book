import React, { useState, useEffect } from 'react'
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Home() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get('http://localhost:5000/api/get');
    setData(response.data);
  }

  useEffect(() => {
    loadData();
  }, [])

  const deleteContact = id => {
    if(window.confirm('Are you sure that you want to delete this contact ?')) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      alert('contact deleted sucessfully!');
      setTimeout(()=> loadData(), 500);
    }
  }

  return (
    <div className='home_container'>
      <Link to='/addContact'>
        <button className='btn btn-contact'>Add Contact</button>
      </Link>
      <table className='table'>
        <thead >
          <tr className='table-header'>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item , idx) => {
              return(
                <tr key={item.id}>
            <th>{idx + 1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.contact}</td>
            <td>
              <Link to={`/update/${item.id}`}><button className='btn btn-edit'>Edit</button></Link>
              <button className='btn btn-delete' onClick={()=> deleteContact(item.id)}>Delete</button>
              <Link to={`/view/${item.id}`}>
                <button className='btn btn-view'>View</button>
              </Link>

            </td>
          </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home