import notFoundImage from '../../assets/img/auto.png'
import { useState } from 'react'
import './Card.css';

const Card = (
  {
    description, 
    make,
    model,
    km,
    id,
    image,
    estimatedate,
    inMaintenace
  }:{ 
    description: string,
    make: string,
    model: string,
    km: number,
    id: number,
    image: string,
    estimatedate: string,
    inMaintenace?: boolean
  }

) => {
  const [imgPath, setImgPath]= useState(image)
  const [isInMaintenance, setIsInMaintenance]= useState(inMaintenace ?? false)
  const [isLoadingImage, setIsLoadingImage]= useState(true)
  const handleImageError = () => {
    setImgPath(notFoundImage)
  }

  const handleCardClick = () => {
    setIsLoadingImage(false)
    setIsInMaintenance(!isInMaintenance)
  }

  const handleOnLoad = () => {
    setIsLoadingImage(false)
  }

  return (
    <div
      className={
        `card-main-container ${isInMaintenance ? 'card-background-color-maintenance' : 'card-background-color-no-maintenance'}`
      }
      onClick={handleCardClick}
    >
      <div className="card-main-container-info">
        <div className="card-car-info">
          <b>ID:</b> {id === -1 ? 'Sin ID' : id} <br/>
          <b>MAKE:</b> {make} <br/>
          <b>MODEL:</b> {model} <br/>
          <b>DESCRIPTION:</b> {description} <br/>
          <b>KM:</b> {km === -1 ? 'Sin kilometraje' : km} <br/>
          <b>ESTIMATE DATE:</b> {estimatedate || 'Sin fecha'}
        </div>

        <div className="card-car-image">
          {isLoadingImage && <div className="image-loader"/>}
          <div className={isLoadingImage ? 'hidden-div' : ''}>
            <img
              src={imgPath}
              alt={imgPath}
              onError={handleImageError}
              onLoad={handleOnLoad}
              height='150px'
              width='200px'
            /> 
          </div>
        </div>
      </div>
      <div className="card-car-click-info">
        {
          isInMaintenance ?
          <b>Da click para quitarlo de matenimiento</b> :
          <b>Da click para ponerlo en mantenimiento</b>
        }
      </div>
    </div>
  );
}

export default Card;
