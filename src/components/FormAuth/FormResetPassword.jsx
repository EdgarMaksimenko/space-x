import styles from './Form.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase';
import { sendPasswordResetEmail  } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/popUpSlice';
import { useNavigate } from 'react-router-dom';


  const FormResetPassword = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      mode: 'onBlur',
  });

  
  const onSubmit = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        dispatch(showMessage('Check your email'));
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(showMessage('Something went wrong'));
      });
      reset();
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>Reset</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <input
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/,
                message: 'Please enter valid email'
              }
            })}
            placeholder='Email'
            autoComplete='off'       
          />
          <div className={styles.field__error}>{errors?.email && (<p className={styles.error}>{errors.email.message}</p>)}</div>
        </div>
        
        <div><button type='submit' className={styles.submit}>Confirm</button></div>
      </form>
    </div>
  )
};

export default FormResetPassword;