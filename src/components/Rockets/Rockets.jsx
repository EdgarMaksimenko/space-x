import React from 'react';
import styles from './Rockets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRocketsData } from '../../store/slices/rocketSlice';
import { NavLink } from 'react-router-dom';
import ThreeDots from '../Skeleton/ThreeDots';

const Rockets = () => {
  const { rocketsData, isLoading } = useSelector((state) => state.rocket);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRocketsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoading && localStorage.rocketsData){
    const localData = JSON.parse(localStorage.rocketsData);

    return (
      <div className={styles.rockets}>
        {localData.map(el => (
          <div key={el.id} className={styles.rockets__item}>
            <NavLink to={`/rocket/${el.id}`} >
              <img src={el.images[0]} alt="rocket" />
              <p>{el.name}</p>
            </NavLink>
          </div>
        ))}
      </div>
    )
  }else if (!isLoading){
    return (
      <div className={styles.rockets}>
        {rocketsData.map(el => (
          <div key={el.id} className={styles.rockets__item}>
            <NavLink to={`/rocket/${el.id}`} >
              <img src={el.flickr_images[0]} alt="rocket" />
              <p>{el.name}</p>
            </NavLink>
          </div>
        ))}
      </div>
    )
  }else{
    return (
      <div className={styles.loading}>
        <div className={styles.loading__item}>
          <ThreeDots/>
        </div>
      </div>
    )
  }
};

export default Rockets;