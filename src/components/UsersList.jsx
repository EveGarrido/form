import React from 'react';

const UsersList = ({usersList, selectUser, deleteUser}) => {
  return (
    <ul className='list'>
      {
        usersList.map( user => (
            <li key={user.id}>
              <p><b>First Name: </b>{user.first_name}</p>
              <p><b>Last Name: </b>{user.last_name}</p>
              <p><b>Email: </b>{user.email}</p>
              <p><b>Password: </b>******</p>
              <p><b>Birthday: </b>{user.birthday}</p>
              <button className='btn-select' onClick={()=> selectUser(user)}><i className="fa-solid fa-pen-to-square"></i></button>
              <button className='btn-delete' onClick={()=> deleteUser(user.id)}><i className="fa-solid fa-trash"></i></button>
            </li>
          ))
      }
    </ul>
  );
};

export default UsersList;