import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import profileImg from '../../static/profile-img.png'
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { userActive } = useSelector((state) => state.userData);



  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to={'/'}>S p a c e X</NavLink>
      </div>
      <div className={styles.header__profile}>
        <div className={styles.header__auth}>
          {userActive 
          ? <NavLink to={'/profile'}><img className={styles.profile__img} src={profileImg} alt="profile-img" /></NavLink>
          : <>
              <NavLink to={'/registration'} >Sign Up</NavLink>
              <span>|</span>
              <NavLink to={'/login'} >Log in</NavLink>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header;