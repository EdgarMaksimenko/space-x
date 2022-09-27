import styles from './PopUp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import closeBtn from '../../static/close-btn.png';
import { closePopUp } from '../../store/slices/popUpSlice';

const PopUp = () => {
  const { isActive, message } = useSelector((state) => state.popUp);
  const dispatch = useDispatch();

  return (
    <div className={isActive ? styles.popup + ' ' + styles.active : styles.popup}>
      <div className={styles.popup__inner}>
        <p>{message}</p>
        <img src={closeBtn} alt="close" onClick={() => dispatch(closePopUp())}/>
      </div>
    </div>
  )
};

export default PopUp;