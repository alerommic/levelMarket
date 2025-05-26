import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE from './config';

const Users = (props) => {
  const userList = props.users;
  const [list, setList] = useState([]);

  useEffect(() => { setList(userList);
  }, [userList]);
  
  const userListUpdated = (list)
  
  const handleDelete = async (userid) => {
    if (!window.confirm('Seguro que quieres eliminar este usuario?')) return;
    console.log(userid);
    try {
      const res = await fetch(`${API_BASE}/admin/userDelete/${userid}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setList(prev => prev.filter(u => u.userid !== userid));
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el juego.');
    }
  };

  return( 
    <>
    

      <div className="p-6 flex items-center justify-center bg-slate-100" >
      <table className="min-w-full bg-white border ">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left">email</th>
            <th className="py-2 px-4 text-left">fullname</th>
            <th className="py-2 px-4 text-left">address</th>
            <th className="py-2 px-4 text-left">is_admin</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userListUpdated.map((user) => {
            return(
            <tr key={user.userid} className="border-b">
              <td className="py-2 px-4">{user.userid}</td>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.fullname}</td>
              <td className="py-2 px-4">{user.address}</td>
              <td className="py-2 px-4">{user.is_admin ? <p>Si</p> :<p>No</p>}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(user.userid)}
                  className="text-red-600 hover:underline"
                >
                  Borrar
                </button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      
    </div>

    </>);
}
//sin los prototypes da error
Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userid: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      fullname : PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      is_admin: PropTypes.bool,
    })
  ).isRequired
};

export default Users;