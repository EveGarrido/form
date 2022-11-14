import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';
import swal from 'sweetalert';

function App() {

  const [ usersList, setUsersList ] = useState([]);
  const [ userSelected, setUserSelected] = useState(null);

  useEffect(()=> {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsersList(res.data))
  }, []);

  const getUsers = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsersList(res.data))   
  }

  const selectUser = (user) =>{
    console.log('seleccionando usuario');
    setUserSelected(user);
  }

  const deselectUser = () => {
    console.log('probando probando');
    setUserSelected(null);
  }

  const deleteUser = (id) => {
    swal({
      title: 'Deleting User',
      text: 'Are you sure you want to delete the user?',
      icon: 'warning',
      buttons: ['No', 'Yes']
    })
    .then(res=> {
      if(res) {
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then(res => {
          getUsers(res.data);
          swal({title: 'User Deleted Successfully', icon: 'success'});
        });
      };
    })
  }

  console.log(usersList);

  return (
    <div className="App">
      <UsersList 
        usersList={usersList} 
        selectUser={selectUser}
        deleteUser={deleteUser}/>
      <UsersForm 
        getUsers={getUsers} 
        userSelected={userSelected} 
        deselectUser={deselectUser}/>       
    </div>
  )
}

export default App
