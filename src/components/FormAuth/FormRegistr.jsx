import styles from './Form.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/popUpSlice';
import { useNavigate } from 'react-router-dom';


  const FormRegistr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
      setValue,
    } = useForm({
      mode: 'onBlur',
  });

  const createUserProfile = async (id, email) => {
    await addDoc(collection(db, 'userData'),
      {
        uid: id,
        email: email,
      }
    )
  };

  const onSubmit = (data) => {
    if (data.password === data.passwordConfirm){
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user.uid, data.email);
        dispatch(showMessage('You have been successfuly signed up'));
        navigate('/login');
      })
      .catch((error) => {
        dispatch(showMessage(error.message));
      });
      reset();
    }else{
      setValue('password', '');
      setValue('passwordConfirm', '');
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>Sign up</p>
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
        
        <div className={styles.field}>
          <input
            {...register('password', {
              required: 'This field is required'
            })}
            placeholder='Password'
            type='password'
            autoComplete='off'       
          />
          <div className={styles.field__error}>{errors?.password && (<p className={styles.error}>{errors.password.message}</p>)}</div>
        </div>

        <div className={styles.field}>
          <input
            {...register('passwordConfirm', {
              required: 'This field is required'
            })}
            placeholder='Repeat password'
            type='password'
            autoComplete='off'        
          />
          <div className={styles.field__error}>{errors?.passwordConfirm && (<p className={styles.error}>{errors.passwordConfirm.message}</p>)}</div>
        </div>
        <div><button type='submit' className={styles.submit}>Confirm</button></div>
      </form>
    </div>
  )
};

export default FormRegistr;