import React from 'react';
import { useParams } from 'react-router';
import styles from './RocketsItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRocketsDataItem } from '../../store/slices/rocketItemSlice';
import { addFavourite } from '../../store/slices/userProfileSlice';
import { showMessage } from '../../store/slices/popUpSlice';
import ThreeDots from '../Skeleton/ThreeDots';

const RocketsItem = () => {
  const { rocketsDataItem, isLoading } = useSelector((state) => state.rocketItem);
  const { userData, userActive} = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageNumber, setImageNumber] = React.useState(0);
  
  React.useEffect(() => {
    dispatch(getRocketsDataItem(id));
  }, []);

  const addToFavourite = () => {
    if (userData.favourites && userData.favourites.find(el => el.id === rocketsDataItem.id)){
      dispatch(showMessage('You already added it'));
    }else{
      const item = {
        id: rocketsDataItem.id,
        name: rocketsDataItem.name,
        img: rocketsDataItem.flickr_images[0],
      };
      dispatch(addFavourite(item));
    }
  };
  
  const ChangeImg = (action, images) => {
    if (action === '+'){
      if (imageNumber < images.length - 1){
        setImageNumber(imageNumber + 1);
      }else{
        setImageNumber(0);
      }
    }
    if (action === '-') {
      if (imageNumber === 0){
        setImageNumber(images.length - 1);
      }else{
        setImageNumber(imageNumber - 1);
      }
    }
  };

  if (!isLoading){
    return (
      <div className={styles.main}>
        <p className={styles.main__title}>{rocketsDataItem.description}</p>
        <div className={styles.main__info}>
          <div className={styles.main__img}>
            <button className={styles.btn__prev} onClick={() => ChangeImg('-',rocketsDataItem.flickr_images)}>&#10148;</button>
            <img src={rocketsDataItem.flickr_images[imageNumber]} alt="info-img" />
            <button className={styles.btn__next} onClick={() => ChangeImg('+',rocketsDataItem.flickr_images)}>&#10148;</button>
          </div>
          <div className={styles.text__block}>
            <p className={styles.text__block__title}>Information</p>
            <p>Name: {rocketsDataItem.name}</p>
            <p>First flight: {rocketsDataItem.first_flight}</p>
            <p>Dry mass: {rocketsDataItem.dry_mass_kg} kg ({rocketsDataItem.dry_mass_lb} lb)</p>
            <p>Diameter: {rocketsDataItem.diameter.meters} meters ({rocketsDataItem.diameter.feet} feet)</p>
            <p>Height with trunk: {rocketsDataItem.height_w_trunk.meters} meters ({rocketsDataItem.height_w_trunk.feet} feet)</p>
            {userActive && <button className={styles.favourite} onClick={() => addToFavourite()}>to favourite</button>}  
            <a href={rocketsDataItem.wikipedia} target="_blank">read more</a>
          </div>
        </div>
      </div>
    )
  }else{
    return (
    <div className={styles.loading}>
      <div className={styles.loading__item}>
        <ThreeDots/>
      </div>
    </div>
 
  )}
};

export default RocketsItem;