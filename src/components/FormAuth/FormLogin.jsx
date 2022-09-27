import styles from './Form.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { initializeUser } from '../../store/slices/userProfileSlice';
import { showMessage } from '../../store/slices/popUpSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const FormLogin = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [usrData] = useCollection(collection(db,'userData'));
  const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      mode: 'onBlur',
  });

  const getUserProfile = (id) => {
    const userProfile = usrData.docs.find(doc => doc._document.data.value.mapValue.fields.uid.stringValue === id)._document.data.value.mapValue.fields;
    dispatch(initializeUser(userProfile));
  };
  
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        getUserProfile(user.uid);
        dispatch(showMessage('You have successfully logged in'));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(showMessage('Wrong login or password'));
      });
      reset();
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>Log in</p>
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
        <NavLink to={'/resetpassword'} className={styles.resetpass}>Forgot password?</NavLink>

        <div><button type='submit' className={styles.submit}>Confirm</button></div>
      </form>
    </div>
  )
};

export default FormLogin;