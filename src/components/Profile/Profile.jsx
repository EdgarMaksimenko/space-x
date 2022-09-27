import styles from './Profile.module.css';
import closeBtn from '../../static/close-btn.png';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeFavourite, unInitializeUser } from '../../store/slices/userProfileSlice';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

const Profile = () => {
  const { userData } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logOut = () => {
    dispatch(unInitializeUser());
    signOut(auth);
    navigate('/');
  };

  
  return (
    <div className={styles.profile}>
      <div className={styles.profile__info}>
      <p>{userData.email}</p>
      <button className={styles.logout} onClick={() => logOut()}>log out</button>
      </div>
      <div className={styles.favourites}>
        <p className={styles.favourites__title}>Your favourites</p>
        {userData.favourites && userData.favourites.map((item, index) => (
          <div className={styles.favourites__item} key={index}>
            <img src={item.img} alt="item-img" />
            <div className={styles.favourites__item__info}>
              <p>{item.name}</p>
              <NavLink to={`/rocket/${item.id}`} >show</NavLink>
              <img src={closeBtn} alt="delete" onClick={() => dispatch(removeFavourite(item.id))}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Profile;