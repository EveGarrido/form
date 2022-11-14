import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';


const UsersForm = ({getUsers, userSelected, deselectUser}) => {
  
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday:''
  }

  const { handleSubmit, register, reset } = useForm();

  useEffect(()=>{
    if(userSelected){
      reset(userSelected);
    } else {
      reset(initialValues);
    }
  }, [userSelected]);

  const submit = (data) => {
    if(userSelected){
      swal({
        title:'Are you sure you want to modify the user?',
        icon: 'warning',
        buttons:['no', 'yes']})
          .then(res=>{
            if(res){
            swal({title: 'User Modified Successfully', icon:'success'})
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
              .then(()=> {
              getUsers();
              deselectUser();
        })
      .catch(error => console.log(error.response?.data));
    } else {
      deselectUser();
    }
    })
    } else {
      axios.post('https://users-crud1.herokuapp.com/users/', data)
        .then(()=> {
          getUsers();
          swal({ title: 'User Created Successfully', icon: 'success'});
          deselectUser();
        })
      .catch(error => console.log(error.response?.data));
    }
    reset(initialValues);
  }

  return (
      <form className="form" onSubmit={handleSubmit(submit)}>
        <h1>New User</h1>
        <div className='inputs'>
          <label htmlFor="first_name"> <i className="fa-solid fa-user"></i></label>
          <input {...register('first_name')} type="text" id="first_name" placeholder='First Name'/>
        </div>
        <div className='inputs'>
          <label htmlFor="last_name"></label>
          <input { ...register('last_name')}type="text" id="last_name" placeholder='Last Name'/>
        </div>
        <div className='inputs'>
          <label htmlFor="email"><i className="fa-sharp fa-solid fa-envelope"></i></label>
          <input {...register('email')} type="text" id="email" placeholder='Email'/>
        </div>
        <div className='inputs'>
          <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
          <input {...register('password')} type="password" id="password" placeholder='Password'/>
        </div>
        <div className='inputs'>
          <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
          <input {...register('birthday')} type="date" id="birthday" />
        </div>
        <button>Submit</button>
      </form>        
  );
};

export default UsersForm;